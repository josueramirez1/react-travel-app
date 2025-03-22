import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
import {useEffect, useRef} from "react";


const Map = ({coords}) => {

    mapboxgl.accessToken = "pk.eyJ1IjoicmFtaXJlemthdDMiLCJhIjoiY2xxY3ZucmhpMDZuejJrcHJxMnNnaWEwYyJ9.g685rF7k5sibhp8FJfQ2eg"

    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return
        if (coords) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current, // container ID
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                center: coords, // starting position [lng, lat]
                zoom: 5 // starting zoom
            });
        }
    }, [coords])


    return (
        <div className={"map-container"}>
            <div ref={mapContainer}/>
        </div>
    )
}
export default Map;