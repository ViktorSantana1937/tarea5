// Los archivos geojson fueron obtenidos del siguiente repositorio: 
// https://github.com/caracena/chile-geojson/blame/master/regiones.json

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
import data from './data.json' with {type : 'json'}
import estadios from './estadios.json' with {type : 'json'}

const width = 500, height = 500

const projection = d3.geoMercator()
    .fitSize([width, height], data)

const path = d3.geoPath(projection)


const poblaciones = data.features.map(d => d.properties.Poblacion)
const colorScale = d3.scaleSequential()
    .domain([d3.min(poblaciones), d3.max(poblaciones)])
    .interpolator(d3.interpolateBlues);

//const estadio = data.features(d => d.properties.estadio)



    
d3.select('.mapa')
    .attr('transform', 'translate(0, -10)')
    .selectAll('path')
    .data(data.features)
    .join('path')
    .attr('d', path)
    .attr('fill', '#ffffffff')
    .attr("stroke", "#00b7ffff")
    .attr("stroke-width", 1)

const estadio = data.estadio

    d3.select('.estadios')
    .selectAll('circle')
    .data(estadios)
    .join('circle')
    
    .attr('r', function(e){
        return e.goles * 0.7
    })
    .attr('cy', function(e){
        return e.top
    })
    .attr('cx', function(e){
        return e.left
    })
    .attr('fill', function(e){
        return e.color
    })
    // .attr('transform', translate(e.top),(e.left))
    

const etiqueta = d3.select('body').append('div')
    .classed('etiqueta', true);


d3.select('.estadios').selectAll('circle')
    .on('mouseenter', (e, d) => {
        console.log(d)
        etiqueta.style('opacity', 1)
            .style('top', e.pageY + 10 + 'px')
            .style('left', e.pageX + 10 + 'px')
            .html(`
                <p><b>${d.estadio}</b></p>
               
            `);
    })
    .on('mouseout', () => {
        etiqueta.style('opacity', 0)
    });