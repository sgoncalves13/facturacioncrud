import Header from "../../components/Header/Header";
import MainContainer from "../../layout/MainContainer";
import styled, { keyframes } from 'styled-components';
import deviceSize from '../../styles/breakpoints';
import { ListadoFacturas } from "./ListadoFacturas";

import React, { useEffect, useState } from "react";

import environment from '../../environment.json'
import { useNavigate } from "react-router-dom";
import PaginationFacturas from "./PaginationFactura";

const HomeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 40px;
  & > div:first-child {
    margin-right: auto;
  }
  @media screen and (min-width: ${deviceSize.md}) {
    margin-bottom: 1.5rem;
  }
  @media screen and (min-width: ${deviceSize.lg}) {
    margin-bottom: 2.0625rem;
  }
`;

const Heading = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.4375rem;
  @media screen and (min-width: ${deviceSize.md}) {
    font-size: 2rem;
  }
`;


const hoverAnimation = keyframes`
  from {
    background-color: blue;
  }
  to {
    background-color: green;
  }
`;

const CreateFacturaButton = styled.button`
  height: 40px;
  width: 150px;
  display: inline-block;
  font-family: Spartan, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.25px;
  line-height: 1;
  border-radius: 6.25rem;
  border: none;
  cursor: pointer;
  user-select: none;
  background-color: #7C5DFA;
  color: white;
  outline: none; /* Elimina el contorno predeterminado al enfocar */
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #01B869;
    transform: translateY(-3px); /* Efecto de levantamiento al pasar el mouse */
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background-color: rgba(255, 255, 255, 0.1);
    transition: width 0.3s ease, height 0.3s ease;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    pointer-events: none;
  }

  &:hover:before {
    width: 0;
    height: 0;
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: rgba(255, 255, 255, 0.1);
    transition: width 0.3s ease, height 0.3s ease;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    pointer-events: none;
  }

  &:hover:after {
    width: 300%;
    height: 300%;
  }

  &:hover span {
    transform: translateY(-50%) scale(1.1); /* Efecto de escala al pasar el mouse */
  }

  span {
    position: relative;
    z-index: 1;
    transition: transform 0.2s ease;
  }
`;


export const FacturaHome = () => {

  const navigate = useNavigate()
  const [facturas, setFacturas] = useState([]);
  const [count, setCount] = useState(null)
  const [countPages, setCountPages] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [quantityPerPage, setQuantityPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const token = localStorage.getItem('idToken'); // Obtiene el token de localStorage

    async function fetchFacturas(page, quantityPerPage) {
        try {
            const response = await fetch(`${environment.baseUrl}/Factura/GetAllCabeceraPage?Page=${page}&QuantityPerPage=${quantityPerPage}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            const values = jsonData.value
            setFacturas(values.listCabeceras);
            setCount(values.count)
            setCountPages(values.countPages)
            console.log(jsonData)
        } catch (error) {
            console.error('Error fetching invoices:', error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    useEffect(() => {
        fetchFacturas(currentPage, quantityPerPage);
    }, [currentPage, quantityPerPage]); 

    return (
            <div>
                {/* <Header/> */}
                <MainContainer>
                <HomeHeader>
                    <div>
                    <Heading>Facturas</Heading>
                    <p>Conteo Facturas: {String(count)}</p>
                    </div>
                    <CreateFacturaButton onClick={() => {navigate('/Facturas/Create')}}>Crear factura</CreateFacturaButton>
                </HomeHeader>
                <div className="Pagination">
                      <PaginationFacturas totalPages={countPages} currentPage={currentPage} onPageChange={handlePageChange}/>
                    </div>
                    <div>
                    <ListadoFacturas facturas={facturas} isLoading={isLoading} hasError={hasError}/>
                    </div>
                </MainContainer>
            </div>
    );
};