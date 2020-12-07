import React from 'react'

class ProductList extends React.Component {
    constructor(props) {
        super (props);

        this.state = {
            products: [],
            categories: [],
            value: ""
        }
    }

    handleChange = (event) => {
        this.setState({value:event.target.value})
    }

    componentDidMount(){
    fetch('https://gorest.co.in/public-api/products')
        .then(response => response.json())
        .then(data=> {
            let products = data.data
            let allCat = []

            products.forEach(product => {
                product.categories.forEach(category => {
                    if(!allCat.includes(category.name)){
                        allCat.push(category.name)
                    }
                })
            })
            console.log(allCat)
            let allCategories1 = products.map(product => product.categories.map(category => category.name))
             console.log('allCategories1',allCategories1)
            let allCategories = []
            allCategories1.forEach(row => allCategories.push(...row))
            // console.log('allCategories',allCategories)

            let uniqueCategories = []
            allCategories.forEach(category => {
                if(!uniqueCategories.includes(category)) {
                    uniqueCategories.push(category)
                }
            })
            // console.log('uniqueCategories',uniqueCategories)

            this.setState({
                products: data.data,
                categories: uniqueCategories})
        })
    }


    render(){
        console.log('products', this.state.products)

        let filteredArr = this.state.products

        if (this.state.value != "") {
            filteredArr = this.state.products.filter(product => {
                    if (product.categories.filter(category => category.name === this.state.value).length > 0) {
                        return true
                    }
                    return false
                }
            )
        }

        // console.log('filteredArr',filteredArr)
        return (
        <div>
            <h1> ProductList</h1>
            <form>
                <select value={this.state.value} onChange={this.handleChange} >
                    {this.state.categories.map(category => <option value={category} id={category.id} key={category.id}> {category}</option>
                        )}
                </select>
            </form>
            <p>{filteredArr.length} Ergebnisse </p>
            <div className="grid">
                {filteredArr.map(product =>
                <div key={product.id}>
                    <img src={product.image} alt={product.name}/>
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                </div>
                )}
            </div>
        </div>
        )
    }
}

export default ProductList