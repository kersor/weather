export interface City {
    admin1: string;          
    admin1_id: number;       
    country: string;         
    country_code: string;    
    country_id: number;     
    elevation: number;       
    feature_code: string;   
    id: number;             
    latitude: number;        
    longitude: number;    
    name: string;           
    population: number;     
    timezone: string;
}

export interface CityLocalStorage {
    admin1: string;          
    admin1_id: number;       
    country: string;         
    country_code: string;    
    country_id: number;     
    elevation: number;       
    feature_code: string;   
    id: number;             
    latitude: number;        
    longitude: number;    
    name: string;           
    population: number;     
    timezone: string;
    daily: Daily   
}

export interface Daily {
    temperature_2m_max: string[]
    temperature_2m_min: string[]
    time: string[]
    weathercode: number[]
}