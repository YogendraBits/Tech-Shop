import { useState } from 'react';

export const useCurrentLocation = () => {
    const [loadingLocation, setLoadingLocation] = useState(false);

    const getCurrentLocation = async (setAddress, setCity, setPostalCode, setCountry) => {
        setLoadingLocation(true);
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by this browser.');
            setLoadingLocation(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            const { latitude, longitude } = coords;
            try {
                const response = await fetch(`/api/geocode?latitude=${latitude}&longitude=${longitude}`);
                const data = await response.json();
                if (response.ok) {
                    setAddress(`${data.road} ${data._normalized_city}`.trim());
                    setCity(data.state_district || '');
                    setPostalCode(data.postcode || '');
                    setCountry(data.country || '');
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error fetching geocoding data:', error);
                alert('Unable to retrieve address details.');
            } finally {
                setLoadingLocation(false);
            }
        }, (error) => {
            console.error('Error getting location:', error);
            alert('Unable to retrieve your location.');
            setLoadingLocation(false);
        });
    };

    return { getCurrentLocation, loadingLocation };
};