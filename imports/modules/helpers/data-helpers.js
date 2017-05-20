


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

