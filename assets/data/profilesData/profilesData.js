
let IdProfile = 0;


const getIdProfile = (title, suffix = "") => {
    const profilesTitels = title.toLowerCase().replace(/[^a-z0-9]/g, "-");

    IdProfile++;
    return `${profilesTitels}-${IdProfile}${suffix}`;
};

export const createProfiles = (
  title,
  image,
  age,
  gender,
  profesional,
  location,
  description = "",
  interests = [],
  totalConins,
  gallery = [],
   PreferencesType// default
) => {
  return {
    id: getIdProfile(title),
    title,
    image,
    age,
    gender,
    profesional,
    location,
    description,
  

    ProInterests: interests.map((item) => ({
      id: getIdProfile(item, "-interest"),
      name: item,
    })),

    totalConins,

    ProGallery: gallery.map((gallery) => ({
      id: getIdProfile(gallery, "-gallery"),
      name: gallery,
    })),
    // PreferencesType: lookingForType.map((gallery) => ({
    //   id: getIdProfile(lookingForType, "-id"),
    //   name: lookingForType,
    // })),
     PreferencesType
     
  };
};



export const profiles_data = [
    createProfiles(
        "Aarav",
       require('../../image/boys/aarav.jpg'),
        "28",
        "Man",
        "IT Software",
        "Mumbai",
        `
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    `,
        ["Travelling", "Photography", "Fitness"],
        120,
        [
            '../../image/boys/aarav1.jpg',
            '../../image/boys/aarav2.jpg',
            '../../image/boys/aarav3.jpg'
        ],
        "Somthing casual"
    ),

    createProfiles(
        "Bharat",
         require('../../image/boys/bharat.jpg'),
        "30",
        "Man",
        "IT Software",
        "Kolkata",
        `
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    `,
        ["Travelling", "Photography", "Fitness"],
        110,
        [
            '../../image/boys/aarav1.jpg',
            '../../image/boys/aarav2.jpg',
            '../../image/boys/aarav3.jpg'
        ],
        "A relationship"
    ),

    createProfiles(
        "Chaitanya",
         require('../../image/boys/chaitanya.jpg'),
        "32",
        "Man",
        "IT Software",
        "Kolkata",
        `
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    `,
        ["Travelling", "Photography", "Fitness"],
        130,
        [
            '../../image/boys/aarav1.jpg',
            '../../image/boys/aarav2.jpg',
            '../../image/boys/aarav3.jpg'
        ],
        'I’m not sure yet'
    ),

    createProfiles(
        "Ananya",
          require('../../image/girls/ananya.jpg'),
        "26",
        "Woman",
        "Graphic Designer",
        "Mumbai",
        `
    Creative and passionate about art & colors.
    Love exploring cafes and capturing aesthetic moments.
  `,
        ["Drawing", "Travelling", "Music"],
        118,
        [
            '../../image/girls/ananya1.jpg',
            '../../image/girls/ananya2.jpg',
            '../../image/girls/ananya3.jpg'
        ],
        'Prefer not to say'
    ),

    createProfiles(
        "Riya",
         require('../../image/girls/riya.jpg'),
        "24",
        "Woman",
        "Digital Marketer",
        "Bangalore",
        `
    Ambitious, friendly and love meeting new people.
    Coffee lover and always up for a long conversation.
  `,
        ["Dancing", "Reading", "Yoga"],
        142,
        [
            '../../image/girls/riya1.jpg',
            '../../image/girls/riya2.jpg',
            '../../image/girls/riya3.jpg'
        ],
        "A relationship"
    ),

    createProfiles(
        "Suhana",
          require('../../image/girls/suhana.jpg'),
        "27",
        "Woman",
        "Fashion Stylist",
        "Delhi",
        `
    Style enthusiast with a love for travel.
    Believe in positivity and living life with grace.
  `,
        ["Fashion", "Photography", "Cooking"],
        125,
        [
            '../../image/girls/suhana1.jpg',
            '../../image/girls/suhana2.jpg',
            '../../image/girls/suhana3.jpg'
        ],
        "A relationship"
    ),


];
