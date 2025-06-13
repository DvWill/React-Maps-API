import { useEffect, useState } from "react";

export default function useGoogleMaps() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (window.google && window.google.maps) {
            setLoaded(true);
            return;
        }
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?libraries=places`;
        script.async = true;
        script.onload = () => setLoaded(true);
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return loaded;
}
