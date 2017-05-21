

// selectSearchFilter()
// ===================================
export const selectSearchFilter = (input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;




// selectFilterByLabel()
// ===================================
// selectFilterByLabel() will filter by the option "label values" rather than the options actual values 
// values are often _ids so makes no sense to search them
export const selectFilterByLabel = (input, option) => {
  return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

export const getCategoryTag = (tag) => {
   switch(tag) {
          case 'bagsluggage':
              return 'Bags & Luggage'
              break;
          case 'banks':
              return 'Banks'
              break;
          case 'bookscardsgifts':
              return 'Books, Cards & Gifts'
              break;
          case 'departmentstores':
              return 'Department Stores'
              break;
          case 'entertainment':
              return 'Entertainment'
              break;
          case 'fashion':
              return 'Fashion'
              break;
          case 'fooddrink':
              return 'Food & Drink'
          case 'groceries':
              return 'Groceries'
          case 'healthbeauty':
              return 'Health & Beauty'
          case 'healthservices':
              return 'Health Services'
          case 'home':
              return 'Home'
          case 'jewelrywatches':
              return 'Jewellery & Watches'
          case 'kidsparents':
              return 'Kids & Parents'
          case 'luxury-retailers':
              return 'Luxury Retailers'
          case 'pets':
              return 'Pets'
          case 'premium-retailers':
              return 'Premium Retailers'
          case 'services':
              return 'Services'
          case 'shoes':
              return 'Shoes'
          case 'sportsfitness':
              return 'Sports & Fitness'
          case 'tech':
              return 'Tech';
          case 'toyshobbies':
              return 'Toys & Hobbies';
          case 'varietystores':
              return 'Variety Stores'
          default:
             return ''
      }
}

export const CATEGORY_OPTIONS = [
  { label: 'Bags & Luggage', value: 'bagsluggage'},
  { label: 'Banks', value: 'banks'},
  { label: 'Books, Cards & Gifts', value: 'bookscardsgifts'},
  { label: 'Department Stores', value: 'departmentstores'},
  { label: 'Discount & Variety', value: 'discountvariety'},
  { label: 'Entertainment', value: 'entertainment'},
  { label: 'Fashion', value: 'fashion'},
  { label: 'Food & Drink', value: 'fooddrink'},
  { label: 'Groceries', value: 'groceries'},
  { label: 'Health & Beauty', value: 'healthbeauty'},
  { label: 'Health Services', value: 'healthservices'},
  { label: 'Home', value: 'home'},
  { label: 'Jewellery & Watches', value: 'jewelrywatches'},
  { label: 'Kids & Parents', value: 'kidsparents'},
  { label: 'Luxury Retailers', value: 'luxury-retailers'},
  { label: 'Pets', value: 'pets'},
  { label: 'Premium Retailers', value: 'premium-retailers'},
  { label: 'Services', value: 'services'},
  { label: 'Shoes', value: 'shoes'},
  { label: 'Specialty Services', value: 'specialtyservices'},
  { label: 'Sports & Fitness', value: 'sportsfitness'},
  { label: 'Tech', value: 'tech'},
  { label: 'Toys & Hobbies', value: 'toyshobbies'},
  { label: 'Variety Stores', value: 'varietystores'},
];

export const DAYS_OPTIONS = [
  { label: 'Sunday', value: 'Sunday'},
  { label: 'Monday', value: 'Monday'},
  { label: 'Tuesday', value: 'Tuesday'},
  { label: 'Wednesday', value: 'Wednesday'},
  { label: 'Thursday', value: 'Thursday'},
  { label: 'Friday', value: 'Friday'},
  { label: 'Saturday', value: 'Saturday'},
  { label: 'Sunday', value: 'Sunday'},
];


states_list, country_list
export const states_list = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
]

export const country_list = ["United States of America", "Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla", "Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
