    // reducer.js

    import { ADDTOCART, REMOVEFROMCART, TOGGLEFAVOURITE,COUNTITEM, CLEARCART, INCREMETCOUNT, DECREMETNCOUNT, CARTVAL ,TOTAL,REMOVEFAV} from './Action';
    import { items } from '../component/DatasCard';

    const initialState = {
        citem:0,
        count : 0,
        total : 0,
        Cart: [],
        data: items.map(item => ({ ...item, isFav: false })),
    };

    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case ADDTOCART: {
                const id = action.payload;
                const itemToAdd = state.data.find(item => item.id === id);
                const existingItemIndex = state.Cart.findIndex(item => item.id === id);

                if (existingItemIndex !== -1) {
                    const updatedCart = state.Cart.map((item, index) =>
                        index === existingItemIndex
                            ? { ...item, count: item.count + 1 }
                            : item
                    );

                    return { ...state, Cart: updatedCart };
                }

                return {
                    ...state,
                    Cart: [...state.Cart, { ...itemToAdd, count: Number(1) }]
                };
            }
            case CARTVAL: {
                let count = 0;
                state.Cart.forEach(element => {
                    count += Number(element.count); 
                });
                return { ...state, count };
            }
            case COUNTITEM: {
                let count = 0;
                state.Cart.forEach(element => {
                    count ++; 
                });
                return { ...state, citem:count };
            }
            case TOTAL: {
                let total = 0;
                state.Cart.forEach(element => {
                    total += Number(element.count) * Number(element.price);
                });
                return { ...state, total };
            }
            
            case REMOVEFROMCART: {
                const updatedCart = state.Cart.filter(item => item.id !== action.payload);
                return { ...state, Cart: updatedCart };
            }
            case REMOVEFAV: {
             
                const updatedData = state.data.map(item =>
                    item.isFav ? { ...item, isFav: false } : item
                );
                return { ...state, data: updatedData };

            }
            case TOGGLEFAVOURITE: {
                const updatedData = state.data.map(item =>
                    item.id === action.payload ? { ...item, isFav: !item.isFav } : item
                );
                return { ...state, data: updatedData };
            }
            case INCREMETCOUNT: {
                const id = action.payload;
                const updatedCart = state.Cart.map(item =>
                    item.id === id ? { ...item, count: item.count + 1 } : item
                );
            
                return { ...state, Cart: updatedCart };
            }
            
            case DECREMETNCOUNT: {
                const id = action.payload;
                const updatedCart = state.Cart.map(item =>
                    item.id === id ? { ...item, count: Math.max(0, item.count - 1) } : item
                ).filter(item=>item.count>0);
            
                return { ...state, Cart: updatedCart };
            }
            
            case CLEARCART: {
                return { ...state, Cart: [] };
            }

            default:
                return state;
        }
    };

    export default reducer;