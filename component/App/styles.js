import {css} from '../../Pro/css.js'

const $app = css({
    name:'.app',
            hover:{

            },
            desk:{
        display : 'flex',
        background_color:'white',
        color: 'black',
            },
            tablet:{
        background_color:'pink'
            },
            mobile:{
        background_color:'blue'
            },
})
const $section = css({
    name:'.section',
            hover:{
        background_color : 'red',
        color:'white',
            },
            desk:{
        display : 'flex',
        flex_direction:'column',
        align_items: 'center',
        border:'1px solid black',
        margin:'5px',
        padding:'5px',
            },
            tablet:{

            },
            mobile:{

            }
})

export const styles = $app + $section;