import {css} from './css.js';

function getKey(str){
    let string = str.toString();
    let res = {};
    string = (string.split('return')[1]);
    string = (string.split('}')[0]);
    res.class = string.match(/class:(.*)/);
    if(res.class != null){

        res.class = res.class.toString().split(',')[0];
        res.class = res.class.toString().split(' ')[0];
        res.class = res.class.replace(/{/g ,'')
                                .replace(/}/g ,'')
                                .replace(/"/g ,'')
                                .replace(/'/g ,'')
                                .replace(/class:/g ,'.')
    }

    res.id = string.match(/id:(.*)/);
    if(res.id != null){

        res.id = res.id.toString().split(',')[0]
        res.id = res.id.toString().split(' ')[0];
        res.id = res.id.replace(/{/g ,'')
                                .replace(/}/g ,'')
                                .replace(/"/g ,'')
                                .replace(/'/g ,'')
                                .replace(/id:/g ,'#')
    }

     
    
    if(res.id){
        return res.id
    }else{

        return res.class;
    }
        
    
   
   
} 
function getStateFromProps(str){
    let res = str.toString().match(/((.*))/);
    return res[0];
}
export function FirstUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export class Component {
    
    constructor({state={},template,styles}){
    // console.time('constructor')

        this.template = template;
        this.state = state;
        this.key = getKey(this.template);
        this.styles = styles;
        this.render = 0;
        this.mount = 0;
        this.component =[];
       
    // this.styles
        if(this.styles != {} || this.styles != undefined){
            if(document.querySelector('#styles-global')){
                document.querySelector('#styles-global').innerHTML += this.styles;
            }else{
                const styles = document.createElement('style')
                styles.id = 'styles-global';
                styles.innerHTML += this.styles;
                document.body.appendChild(styles);
            }
        }
    // this.state
        if(this.state != {}){
            for(let property in this.state){

                this[property]= this.state[property];
                let name = FirstUpperCase(property);
                this[`set${name}`] = (value,evento)=>{
                    this.setState(property,value,evento);
                };
            }
        }

    //console.log('key desde template :',this.key);
    //console.log('>> costruyendo componente :',this.key);
    //console.timeEnd('constructor');
    }

    $(props){
        
    //console.time('mount');
    // si la id viene por props la rescato para el this.key
        if(props != undefined){
            this.props = props;
            if(JSON.stringify(props).includes('id')){
                this.key = `#${props.id}`;
    //console.log('key desde props:',this.key);
            }
    // si el state viene por props y no se a renderizado nunca se graba el valor inicial
            if(JSON.stringify(props).includes('stateInitialValue')){
                if(this.render === 0){
                        this.state[props.id] = props.stateInitialValue;
                        this[props.id] = props.stateInitialValue;
                }
            }
        }
    // aumentar las veces que se monta el componente si nunca se a renderizado para saber si se esta reutilizando
        if(this.render === 0){
            this.mount = this.mount +1;
            this.component.push({
                index:this.mount,
                key:this.key
            })
        }
    //console.log('///');
    //console.log('montando componente :',this.key);
    //console.log('clase montada : ',this.mount , 'veces');
    //console.log('renderizado :',this.render , 'veces');
    //console.log('///');
    //console.timeEnd('mount');
        const component = this.template(props);
        let list = component.querySelectorAll('*[evento]')
        for(let item of list){
            if(item.getAttribute('evento')){
                item.setAttribute('key',this.key);
                item.removeAttribute('evento');

            }
        }
        return component;
    } 

    setState(key,value){
        //console.log('componente a renderizar >>>>',this.key);
        //console.log('componente no reutilizado >>>>',this.component.length <= 1);
        //console.log('evento viene de otro componente >>>>',this.key != event.target.getAttribute('key') );
        //console.log('parametros pasados por evento >>>>',event.detail);
       // console.log('target evento >>>>',event.target);
        
        const distintoComponente = (this.key != event.target.getAttribute('key') && this.component.length <= 1)
    //console.time('upload')
            if(distintoComponente){
                this.refDom = document.querySelector(this.key);
            }else if(event != null){
                let key = event.target.getAttribute('key');
    //console.log(key);
                this.refDom = document.querySelector(key);
    //console.log(this.refDom);
                if(this.refDom.id)this.props.id = this.refDom.id 
    //console.log(this.props);
            }else{
                this.refDom = document.querySelector(this.key);
            }
    //console.log('key:',key,'value:',value);
            this.state[key] = value;
            this[key] = value;
            let parent = this.refDom.parentNode;
            let next = this.refDom.nextSibling;
            let before = this.refDom.previousSibling;


            this.refDom.remove();
    // aumento las veces que se renderiza en componente
            this.render = this.render +1;

            if(next === null && before === null){
                parent.appendChild(this.$(this.props))
            }else if(next === null && before != null){
                parent.appendChild(this.$(this.props))
            }else if(next != null && before === null){
                next.insertAdjacentElement("beforebegin",this.$(this.props));
            }else if(next != null && before != null){
                next.insertAdjacentElement("beforebegin",this.$(this.props));
            }
    //this.refDom = document.querySelector(this.key);
    //console.log('actualizando componente:',this.key);
    //console.timeEnd('upload')
    }

}
export const onMount = (callback,component)=>{
    if(!component && callback) callback();
    if(component && component.render == 0 && callback) callback();
}
export const sendEvent = (e,name,detail)=>{
    
    e.target.dispatchEvent(new CustomEvent(name, {
        bubbles: true,
        detail,
      }))
}