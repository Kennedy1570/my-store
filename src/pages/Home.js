import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Home() {

    const [products, productsInfo] = useState([])

    // pagination functionality
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const pageSize = 8

    // filter functionality
    const [filterParams, setFilterParams] = useState({ brand: "", category: "" })

    // sort functionality
    const [sortColumn, setSortColumn] = useState({ column: "id", orderBy: "desc" })

    function getProducts() {
        let url = "http://localhost:4000/products?_page="  + currentPage + "&_limit=" + pageSize
        //console.log("url=" + url)
        if (filterParams.brand) {
            url = url + "&brand=" + filterParams.brand
        }
        if (filterParams.category) {
            url = url + "&category=" + filterParams.category
        }
        url = url + "&_sort=" + sortColumn.column + "&_order=" + sortColumn.orderBy
        fetch(url)
            .then(response => {
                if(response.ok)
                {
                    let totalCount = response.headers.get('X-Total-Count')
                    let pages = Math.ceil(totalCount / pageSize)
                    setTotalPages(pages)
                    return response.json()
                }
                throw new Error()
            })
            .then(data => {
                productsInfo(data)
            })
            .catch(error => {
                alert("Unable to get data")
            })
    }
    useEffect(getProducts, [currentPage, filterParams, sortColumn])

    // pagination functionality
    let paginationButtons = []
    for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
            <li className={i === currentPage ? "page-item active" : "page-item"} key={i}>
                <a className="page-link" href={"?page=" + i}
                    onClick={event => {
                        event.preventDefault()

                        setCurrentPage(i)
                    }}
                >{i}</a>
            </li>
        )
    }

     // filter functionality
     function handleBrandFilter(event) {
        let brand = event.target.value
        setFilterParams({ ...filterParams, brand: brand })
        setCurrentPage(1)
    }

    function handleCategoryFilter(event) {
        let category = event.target.value
        setFilterParams({ ...filterParams, category: category })
        setCurrentPage(1)
    }

    // sort functionality
    function handleSort(event) {
        let val = event.target.value

        if (val === "0") setSortColumn({ column: "id", orderBy: "desc" })
        else if (val === "1") setSortColumn({ column: "price", orderBy: "asc" })
        else if (val === "2") setSortColumn({ column: "price", orderBy: "desc" })
    }

    return (
        <>
            <div style={{ backgroundColor: "#08618d", minHeight: "200px" }}>
                <div className="container text-white py-5">
                    <div className="row align-items-center g-5">
                        <div className="col-md-6">
                            <h1 className="mb-5 display-2"><strong>Best Store of Electronics</strong></h1>
                            <p>Find a large selection of newest electronic devices from most popular brands and with affordable prices.</p>
                        </div>
                        <div className="col-md-6 text-center">
                            <img src={process.env.PUBLIC_URL + "/images/hero.png"} className="img-fluid" alt="hero" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-light">
                <div className="container py-5">
                    <div className="row mb-5 g-2">
                        <div className="col-md-6">
                            <h4>Products</h4>
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" onChange={handleBrandFilter}>
                                <option value="">All Brands</option>
                                <option value="Samsung">Samsung</option>
                                <option value="Apple">Apple</option>
                                <option value="Nokia">Nokia</option>
                                <option value="HP">HP</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" onChange={handleCategoryFilter}>
                                <option value="">All Categories</option>
                                <option value="Phones">Phones</option>
                                <option value="Computers">Computers</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Printers">Printers</option>
                                <option value="Cameras">Cameras</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" onChange={handleSort}>
                                <option value="0">Order By Newest</option>
                                <option value="1">Price: Low to High</option>
                                <option value="2">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-5 g-3">
                            {
                                products.map((product, index) => {
                                    return (
                                        <div className="col-md-3 col-sm-6" key={index}>
                                            <ProductItem product={product} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <ul className="d-flex justify-content-center pagination">{paginationButtons}</ul>
                </div>
            </div>
        </>
    )
}

function ProductItem({ product }) {
    return (
        <div className="rounded border shadow p-4 text-center h-100">
            <img src={"http://localhost:4000/images/" + product.imageFilename}
                className="img-fluid" alt="..."
                style={{ height: "220px", objectFit: "contain" }} />
            <hr />
            <h4 className="py-2">{product.name}</h4>
            <p>
                Brand: {product.brand}, Category: {product.category} <br />
                {product.description.substr(0, 48) + "..."}
            </p>
            <h4 className="mb-2">{product.price}$</h4>
            <Link className="btn btn-primary btn-sm m-2" to={"/products/" + product.id} role="button">Details</Link>
        </div>
    )
}