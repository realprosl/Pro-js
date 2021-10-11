
// componentes
import {Component} from '../../Pro/Pro.js';
// styles
import {styles} from './styles.js';

export const App = new Component({
    styles,
    template:()=>{
        return h1({class:'app'},'Hello Pro-js!!')
    },
});

