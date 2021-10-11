export default (function HtmlComponents(){

    window.createElement = (type,props,...children)=>{

        let shadow=false
        const element = document.createElement(type);

         if(element != null){

                for(let prop in props){
                   let evento = false;
                    if(prop === 'onClick'){
                        evento = true;
                        element.addEventListener('click',props[prop])
                    }else if(prop === 'onMouseOver'){
                        evento = true;
                        console.log('in mouseover');
                        console.log(props[prop]);
                        element.addEventListener('mouseover',props[prop])
                    }else if(prop == 'onChange'){
                        evento = true;
                        element.addEventListener('change',props[prop])
                    }else if(prop == 'onMouseOver'){
                        evento = true;
                        element.addEventListener('mouseover',props[prop])
                    }else if(prop == 'onMouseOut'){
                        evento = true;
                        element.addEventListener('mouseout',props[prop])
                    }else if(prop == 'hover') {
                        let id = element.getAttribute('id');
                        let className = element.getAttribute('class');
                        let styleRule; 
                        if(typeof props.hover === 'string'){
                            styleRule = props.hover;
                        }else{
                            styleRule = JSON.stringify(props.hover);
                            styleRule = styleRule.replace(/_/g,'-')
                                                    .replace(/"/g,'')
                                                    .replace(/,/g,';')

                        }
                        //console.log(styleRule);
                        if(id || className){
                            const styles = document.querySelector('#styles-global');
                            if(styles){
                                if(id){
                                    //console.log(id);
                                    styleRule = `#${id}:hover ${styleRule}`
                                }else if(className){
                                    //console.log(className);
                                    let sice = [];
                                    sice = className.split(' ');
                                    className = sice[0];
                                    styleRule = `.${className}:hover ${styleRule}`
                                }
                                //console.log(styleRule);
                                styles.innerHTML += styleRule;
                            }
                        }
                    }
                    else{
                        element.setAttribute(prop,props[prop]);
                    }
                    if(evento) element.setAttribute('evento',evento)
                }
                children.forEach(item=>{
        
                    if(typeof item === 'object'){
                        element.appendChild(item)
                    }
                    if(typeof item === 'string'){
                        element.innerHTML += item;
                    }
                    if (typeof item === 'number'){
                        element.innerHTML += item;
                    }
                    if(typeof item === 'boolean'){
                        element.innerHTML += item;
                    }
                })
             

            return element;
         }
         return false;
    
    
    }
    window.renderDom = (component,idElement='root')=>{
        document.body.appendChild(createElement('div',{id:idElement},component))
    }
    window.Div = (props,...children)=>{

        return createElement('div',props,...children);
    }
    window.Form = (props,...children)=>{
        return createElement('form',props,...children);
    }
    window.h1 = (props,...children)=>{
        return createElement('h1',props,...children);
    }
    window.h2 = (props,...children)=>{
        return createElement('h2',props,...children);
    }
    window.h3 = (props,...children)=>{
        return createElement('h3',props,...children);
    }
    window.h4 = (props,...children)=>{
        return createElement('h4',props,...children);
    }
    window.Input = (props)=>{
        return createElement('input',props);
    } 
    window.Label = (props,text)=>{
        return createElement('label',props,text);
    }
    window.Text = (props,...children)=>{
        return createElement('p',props,...children);
    }
    window.Textarea = (props)=>{
        return createElement('textarea',props);
    }
    window.Button = (props,text)=>{
        return createElement('button',props,text);
    }
    window.Cn = (...children)=>{
        return [...children];
    }
    window.Img = (props,src)=>{

        const element = createElement('img',props);
                element.setAttribute('src',src);
        return element;
    }
    // multiples
    window.multiple = (dates,callback) => {
        const body=[]
        for(var date in dates){

                    body.push(callback(dates[date]))
       }
       return body
    }
    window.generateText = (props,data,propertyIsVisible)=>{
        console.log(data);
        if(isArray){
            let text=[];
            for(let item in data){
                if(propertyIsVisible){
                    text.push(Text(props,item))
                    text.push(Text(props,data[item]))
                }else{
                    if(typeof data[item] === 'object')
                    {
                        text.push(...generateText(props,data[item]))
                    }else{
                        text.push(Text(props,data[item]))
                    }
                }
            }
            return text;
            
        }else{
            return Text({},'No es un objeto')
        }
    }
    window.objectStates = {};

    window.addEventListener('load',(e)=>{
        if(objectStates){
            for(let propiedad in objectStates){
                if(objectStates[propiedad].state.props 
                    && objectStates[propiedad].state.props.id){

                        if(document.getElementById(objectStates[propiedad].state.props.id)){
                            objectStates[propiedad].mountParent= true;
                        }
                }
                if(window.document.all[objectStates[propiedad].nameParent]){
                    objectStates[propiedad].mountParent = true;
                }
                if(document.querySelector('.'+objectStates[propiedad].nameParent)){
                    objectStates[propiedad].mountParent = true;

                }
                
            }
        }
    })
    Array.prototype.search = function(param){
        const datos = this;
        if(datos && typeof datos === 'object' && datos[0]){
            param = param.toLowerCase();
            const res = datos.filter(object=>{
                let isTrue = [];
                            for(let item in object){
                                let objectParam = object[item].toLowerCase();
                                if(objectParam.includes(param)){
                                    isTrue.push(true)
                                }else{
                                    isTrue.push(false)
                                }
                            }
                            if(isTrue.includes(true))return true;
            })
            return res;
        }else{
            console.log('no es un array');
        }
    }
    window.isArray = (param)=>{
        if(param 
            && typeof param === 'object' 
                && param[0]
                    || param ===[]){
            return true;
        }else{
            return false;
        }
    }
    window.isObject = (param)=>{
        if(param 
            && typeof param === 'object' 
                && param[0] === undefined
                    && param != []){
            return true;
        }else{
            return false;
        }
    }
    // styles components
    window.Styles = (inner)=>{
        const styles = document.createElement('style');
            styles.innerHTML = inner;
        
        document.body.appendChild(styles)
    }
})()