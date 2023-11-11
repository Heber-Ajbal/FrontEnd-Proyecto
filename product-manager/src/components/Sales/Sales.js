import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import NavBarLayout from "../../layout/NavbarLayout";
import DataTable, { createTheme}  from "react-data-table-component";
import { Button, Container } from "react-bootstrap";
import { API_URL } from "../../auth/routing";
import { useAuth } from "../../auth/AuthProvider";
import Swal from "sweetalert2";

export default function Sales(){

    const [products, setProducts] = useState([]);
    const [search, SetSearch]= useState('');
    const [filter, setFilter] = useState([]);
    const [pending, setPending] = useState(true);
    const [columns, setColumns] = useState([]);

    const Auth = useAuth();

    

    useEffect(()=>{getSales();}, []);

    useEffect(()=>{
        const result= products.filter((item)=>{
            console.log( item)
            const numberMatch = item.numberSale.toLowerCase().includes(search.toLowerCase());
            const idMatch = item.idSale.toString().includes(search.toLowerCase());
            const userMatch = item.user.username.toLowerCase().includes(search.toLowerCase());
            console.log( userMatch)
            return numberMatch || idMatch || userMatch;
        });
        setFilter(result);
    },[search]);

    useEffect(() => {
		const timeout = setTimeout(() => {
            
            const colums = [
                {
                    name:'Id',
                    selector: row => row.idSale,
                    sortable: true,            
                    omit: true
                },
                {
                    name:'Cliente',
                    selector: row => row.user.username,
                    sortable: true
                },
                {
                    name:'Numero de Venta',
                    selector: row => row.numberSale,
                    sortable: true
                },
                {
                    name:'Total de Venta',
                    selector: row => row.total,
                    sortable: true
                },
                {
                    name:'Fecha de Venta',
                    selector: row => row.saleDate,
                    sortable: true
                },
                {
                    name:"Acciones",
                    cell:(row)=>(
                        <div>
                            <Button variant="danger">Ver Reporte</Button>{' '}
                        </div>        
                    )
                    
                }
            ]  
            setColumns(colums);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);


    async function getSales(){
        try {
            const response = await fetch(`${API_URL}/sales`,{
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Auth.getAccessToken()}`
                }
            });

            const data = await response.json();
            console.log(data);

            if(response.ok){
                setProducts(data)
                setFilter(data);
            }
        } catch (error) {
            
        }
    }

    const generatePDF = () => {

        const doc = new jsPDF();
        const columnsPDF = [{
            header:'Id',
            dataKey: 'idproduct'
        },
        {
            header:'Nombre Producto',
            dataKey: 'name'
        },
        {
            header:'Precio',
            dataKey: 'price'
        },
        {
            header:'Cantidad',
            dataKey: 'quantity'
        },
        {
            header:'Fecha de Vencimiento',
            dataKey: 'dueDate'
        }]   
        const dataPDF = products;


        doc.autoTable({
            columns: columnsPDF,
            body: dataPDF
        });

        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Suma 1 al mes porque los meses en JavaScript van de 0 a 11
        const day = String(fecha.getDate()).padStart(2, '0');
        const fechaFormateada = `${year}-${month}-${day}`;

        doc.save(`Repoerte de Productos ${fechaFormateada}.pdf`);
    }

    return (
        <NavBarLayout>
            <Container fluid="md">
            <div class = "text-center">
            <br/><br/>
                <h1>Historial de Ventas Realizadas</h1>
                <div class="col">
                    <DataTable
                        columns={columns}
                        data={filter}
                        progressPending={pending}
                        pagination
                        fixedHeader
                        selectableRowsHighlight
                        highlightOnHover
                        subHeader
                        subHeaderComponent={
                            <div class="col">

                            <input type="text"
                                class="w-25 form-control"
                                placeholder="Buscar Factura..."
                                value={ search}
                                onChange={(e)=>SetSearch(e.target.value)}
                            />
                            </div>
                        }
                        subHeaderAlign="left"
                    
                    />
                </div>


                
            </div>
            </Container>
        </NavBarLayout>
    );
}