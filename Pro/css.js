export const css = (styles)=>{

    const transformInCss = (styles,property,name)=>{
        const media = {
            desk:'@media (min-width: 900px)',
            tablet:'@media (min-width:500px) and (max-width:900px)',
            mobile:'@media (max-width: 499px)',
            hover : `${name}:hover`
        }
        let stylesString = JSON.stringify(styles);
        stylesString = stylesString.replace(/_/g,'-')
                                    .replace(/"/g,'')
                                    .replace(/,/g,';')
        return (property === 'hover')? `${media[property]}${stylesString}`:`${media[property]}{${name}${stylesString}}`
    }

    if(styles && typeof styles === 'object'){
        for(let property in styles){
            if(property != 'name'){
                styles[property] = transformInCss(styles[property],property,styles.name);

            }
        }
        return ` ${styles.hover} ${styles.desk} ${styles.tablet} ${styles.mobile}`
    }
}