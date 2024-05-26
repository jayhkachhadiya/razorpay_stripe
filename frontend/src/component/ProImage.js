import React from 'react'



export default function ProImage({ product }) {
    return (
        <div>
            <img src={product.image} alt={product.name} />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
        </div>
    )
}
