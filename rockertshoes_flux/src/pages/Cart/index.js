import React, { Component } from 'react';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/all';

import { Container, ProductTable, Total } from './styles';

class Cart extends Component {
    render() {
        return (
            <Container>
                <ProductTable>
                    <thead>
                        <tr>
                            <th />
                            <th>Product</th>
                            <th>Qnt</th>
                            <th>Subtoal</th>
                            <th>Product</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <img
                                    src="data:image/jpeg;base64,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8HXft1qthcUBYYikctSwt3ai/DUXQaMOU2fGYTPzmtcT6KtU2YwNXpdL8XgzlxdNMVTBt2+GIDW01qUGOm+pB5bTP8M6Z4GvbJi6QY/qVP7J7/dexPtMHi+ryq2zmYbFdV1duYMDfMX0rwlKumGq16Yq1ACo1t3jZbtsCTsL6zMZh5D2nHH6qK/JV08ra+PrJj0B4kPhxGIX0quPwMDq2OxtOijVarqiLqWOw5TzCY6nVRalNgyNqGGxnIsV1ecQqLkqVq9RdDleq7LcbaMSJbjqwxYGUAhfC5t8oHY8Ri6aatVpr95gv4mYnE9LOHpo+PwwPgKisfkpJnLh1WYgfsxJB1Z4ofsxA32p1icLBscWD92lXb6imRPafT7hrbYxLfvLUT/qUTRB1cYz7E8/8OMX9gfKB0XD9JcFVPcxmGY/81A3yJvMrRxAOoIbzBv9RORt1aYo7oJ5T6ssWpui5D4r3T8xA7HlU7EDyP8AWKmBv8LfK1/acop9CuKr8OKxS+leqPwaV/8A8hxj/jcb/wDIrf64HUDiHoi7jNTG5Olvz5S6w9ejVUOjix2IsR85x/FdBeKVVKVcTiaindWq1GQ+qsxBlOF6v+I0lyUq1ekv2Uq1EW/jZWAgdn7FfH8LH21lvXNKndmqpS82cKPmTORVOr/iLfHWrv8Aequ34mW69VeIvfsxfxtr84G+UOs3C/pL4c5nSmCTiFGaj3RcgEanwBANzKMR1o4cnLh8NXrnvakCkl1XMQWc5gdrd3c2mnr1a4zYC0lXq1xnjA2Wlx7F4ojtcZQwNK6EpQ7+IKFCXHbPorBiFuFGx12mY4BguFYfvBhXqsKeerWPaO7082Woc1wH7x1FuU0mn1Z4r7Rl/hurfEDdzA6inHaB2qCTpxKkdnE5/hOglZd6hmawnRV13cwNsXEqdmEkDjxmGw3Byv6xmSo4a3OBcXiU9nPIEkREBERARaIgLTy09iB5aLT2IHlotPYgeWi09iB5aLT2IHlotPYgeWntoiAtERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQP//Z"
                                    alt="Shoes"
                                />
                            </td>
                            <td>
                                <strong>Super tenis</strong>
                                <span>R$1920,23</span>
                            </td>
                            <td>
                                <div>
                                    <button type="button">
                                        <MdRemoveCircleOutline size={20} color="#7159c1" />
                                    </button>
                                    <input type="number" readOnly value={1} />
                                    <button type="button">
                                        <MdAddCircleOutline size={20} color="#7159c1" />
                                    </button>
                                </div>
                            </td>
                            <td>
                                <strong>R$258,80</strong>
                            </td>

                            <td>
                                <button type="button">
                                    <MdDelete size={20} color="#7159c1" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </ProductTable>
                <footer>
                    <button type="button">Proceed to checkout</button>

                    <Total>
                        <span>TOTAL</span>
                        <strong>R$1920,23</strong>
                    </Total>
                </footer>
            </Container>
        );
    }
}

export default Cart;
