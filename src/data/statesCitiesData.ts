// src/data/statesCitiesData.ts

interface CityZipCodes {
    [city: string]: string;
  }
  
  interface StateCities {
    [state: string]: {
      cities: CityZipCodes;
    };
  }
  
  export const statesCities: StateCities = {
    'Andhra Pradesh': {
      cities: {
        'Visakhapatnam': '530001',
        'Vijayawada': '520001',
        'Tirupati': '517501',
        'Guntur': '522001',
        'Kakinada': '533001',
      },
    },
    'Arunachal Pradesh': {
      cities: {
        'Itanagar': '791111',
        'Naharlagun': '791110',
      },
    },
    'Assam': {
      cities: {
        'Guwahati': '781001',
        'Silchar': '788001',
        'Dibrugarh': '786001',
      },
    },
    'Bihar': {
      cities: {
        'Patna': '800001',
        'Gaya': '823001',
        'Bhagalpur': '812001',
        'Muzaffarpur': '842001',
      },
    },
    'Chhattisgarh': {
      cities: {
        'Raipur': '492001',
        'Bilaspur': '495001',
      },
    },
    'Goa': {
      cities: {
        'Panaji': '403001',
        'Margao': '403601',
      },
    },
    'Gujarat': {
      cities: {
        'Ahmedabad': '380001',
        'Surat': '395001',
        'Vadodara': '390001',
        'Rajkot': '360001',
      },
    },
    'Haryana': {
      cities: {
        'Chandigarh': '160001',
        'Gurgaon': '122018',
        'Faridabad': '121001',
      },
    },
    'Himachal Pradesh': {
      cities: {
        'Shimla': '171001',
        'Dharamshala': '176215',
      },
    },
    'Jharkhand': {
      cities: {
        'Ranchi': '834001',
        'Jamshedpur': '831001',
      },
    },
    'Karnataka': {
      cities: {
        'Bengaluru': '560001',
        'Mysuru': '570001',
        'Hubli': '580020',
      },
    },
    'Kerala': {
      cities: {
        'Thiruvananthapuram': '695001',
        'Kochi': '682001',
        'Kozhikode': '673001',
      },
    },
    'Ladakh': {
      cities: {
        'Leh': '194101',
        'Kargil': '194103',
      },
    },
    'Lakshadweep': {
      cities: {
        'Kavaratti': '682555',
      },
    },
    'Madhya Pradesh': {
      cities: {
        'Bhopal': '462001',
        'Indore': '452001',
        'Gwalior': '474001',
      },
    },
    'Maharashtra': {
      cities: {
        'Mumbai': '400001',
        'Pune': '411001',
        'Nagpur': '440001',
        'Nashik': '422001',
      },
    },
    'Manipur': {
      cities: {
        'Imphal': '795001',
      },
    },
    'Meghalaya': {
      cities: {
        'Shillong': '793001',
      },
    },
    'Mizoram': {
      cities: {
        'Aizawl': '796001',
      },
    },
    'Nagaland': {
      cities: {
        'Kohima': '797001',
        'Dimapur': '797112',
      },
    },
    'Odisha': {
      cities: {
        'Bhubaneswar': '751001',
        'Cuttack': '753001',
      },
    },
    'Puducherry': {
      cities: {
        'Puducherry': '605001',
      },
    },
    'Punjab': {
      cities: {
        'Chandigarh': '160001',
        'Amritsar': '143001',
        'Ludhiana': '141001',
      },
    },
    'Rajasthan': {
      cities: {
        'Jaipur': '302001',
        'Udaipur': '313001',
        'Jodhpur': '342001',
      },
    },
    'Sikkim': {
      cities: {
        'Gangtok': '737101',
      },
    },
    'Tamil Nadu': {
      cities: {
        'Chennai': '600001',
        'Coimbatore': '641001',
        'Madurai': '625001',
      },
    },
    'Telangana': {
      cities: {
        'Hyderabad': '500001',
        'Warangal': '506002',
      },
    },
    'Tripura': {
      cities: {
        'Agartala': '799001',
      },
    },
    'Uttar Pradesh': {
      cities: {
        'Lucknow': '226001',
        'Kanpur': '208001',
        'Varanasi': '221001',
      },
    },
    'Uttarakhand': {
      cities: {
        'Dehradun': '248001',
        'Haridwar': '249401',
      },
    },
    'West Bengal': {
      cities: {
        'Kolkata': '700001',
        'Siliguri': '734001',
      },
    },
  };
  
  export const states: string[] = Object.keys(statesCities);
  