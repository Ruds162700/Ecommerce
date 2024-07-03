import { ADDTOCART, REMOVEFROMCART, TOGGLEFAVOURITE, COUNTITEM, SEARCH, CLEARCART, INCREMETCOUNT, DECREMETNCOUNT, CARTVAL, TOTAL, REMOVEFAV } from './Action';
import { items } from '../component/DatasCard'; // Ensure this import is correct for your project

const initialState = {
    searched: [],
    citem: 0,
    count: 0,
    total: 0,
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
                Cart: [...state.Cart, { ...itemToAdd, count: 1 }]
            };
        }
        case SEARCH: {
            const data = state.data || []; // Ensure state.data is defined and fallback to empty array if not
            const searchTerm = action.payload ? action.payload.toLowerCase() : ""; // Ensure action.payload is defined

            console.log("Search term:", searchTerm);
            const filteredData = data.filter(item =>
                item.title.toLowerCase().includes(searchTerm)
            );
            console.log("Filtered data:", filteredData);

            return { ...state, searched: filteredData };
        }


        case CARTVAL: {
            let count = 0;
            state.Cart.forEach(element => {
                count += Number(element.count);
            });
            return { ...state, count };
        }
        case COUNTITEM: {
            let count = state.Cart.length;
            return { ...state, citem: count };
        }
        case TOTAL: {
            let total = state.Cart.reduce((acc, item) => {
                return acc + (Number(item.count) * Number(item.price));
            }, 0);
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

        // Other cases...

        case TOGGLEFAVOURITE: {
            const itemId = action.payload;

            // Check if item is in data array
            const updatedData = state.data.map(item =>
                item.id === itemId ? { ...item, isFav: !item.isFav } : item
            );

            // Check if item is in searched array
            const updatedSearched = state.searched.map(item =>
                item.id === itemId ? { ...item, isFav: !item.isFav } : item
            );

            return { ...state, data: updatedData, searched: updatedSearched };
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
            ).filter(item => item.count > 0);

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
