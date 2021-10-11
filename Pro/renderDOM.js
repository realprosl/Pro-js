export function renderDOM(component,query){
    if (component && query){
        const el = document.querySelector(query)
        if (el === null) {
            console.log('elemento nulo ');
        }else{
            if(typeof component === 'string'){
                el.innerHTML = component;
            }else{
                el.appendChild(component)
            }
        }
        
    }
}
