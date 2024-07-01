export const ADDTOCART = "ADDTOCART";
export const REMOVEFROMCART = "REMOVEFROMCART";
export const TOGGLEFAVOURITE ="TOGGLEFAVOURITE";
export const CLEARCART = "CLEARCART";
export const INCREMETCOUNT = "INCREMETCOUNT";
export const DECREMETNCOUNT = "DECREMETNCOUNT";
export const CARTVAL = "CARTVAL";
export const TOTAL = "TOTAL";
export const REMOVEFAV = "REMOVEFAV";
export const COUNTITEM = "COUNTITEM";

export const addtocart = (id) =>({
    type :ADDTOCART,
    payload : id,
})
export const countitem = (id) =>({
    type :COUNTITEM,
 
})
export const removefav = () =>({
    type :REMOVEFAV,
})
export const total = () =>({
    type : TOTAL,
})
export const cartval = (id) =>({
    type :CARTVAL,
})

export const removefromcart = (id) =>({
    type :ADDTOCART,
    payload : id,
})
export const togglefavourite = (id) => ({
    type : TOGGLEFAVOURITE,
    payload : id,
})

export const clearcart = (id) =>({
    type:CLEARCART,
})
export const incremetcount = (id) =>({
    type:INCREMETCOUNT,
    payload : id,
})
export const decremetncount = (id) =>({
    type:DECREMETNCOUNT,
    payload:id,

})