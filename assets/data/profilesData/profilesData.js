
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
    gender = [],
    profesional,
    location,
    description = "",
    interests = [],
    totalConins,
    gallery = [],
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

    }

}


export const profiles_data = [
    createProfiles(
        "Aarav",
       require('../assets/images/boys/aarav.jpg'),
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
            '../../assets/images/boys/aarav1.jpg',
            '../../assets/images/boys/aarav2.jpg',
            '../../assets/images/boys/aarav3.jpg'
        ]
    ),

    createProfiles(
        "Bharat",
         require('../assets/images/boys/bharat.jpg'),
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
            '../../assets/images/boys/aarav1.jpg',
            '../../assets/images/boys/aarav2.jpg',
            '../../assets/images/boys/aarav3.jpg'
        ]
    ),

    createProfiles(
        "Chaitanya",
         require('../assets/images/boys/chaitanya.jpg'),
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
            '../../assets/images/boys/aarav1.jpg',
            '../../assets/images/boys/aarav2.jpg',
            '../../assets/images/boys/aarav3.jpg'
        ]
    ),

    createProfiles(
        "Ananya",
          require('../assets/images/girls/ananya.jpg'),
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
            '../../assets/images/girls/ananya1.jpg',
            '../../assets/images/girls/ananya2.jpg',
            '../../assets/images/girls/ananya3.jpg'
        ]
    ),

    createProfiles(
        "Riya",
         require('../assets/images/girls/riya.jpg'),
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
            '../../assets/images/girls/riya1.jpg',
            '../../assets/images/girls/riya2.jpg',
            '../../assets/images/girls/riya3.jpg'
        ]
    ),

    createProfiles(
        "Suhana",
          require('../assets/images/girls/suhana.jpg'),
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
            '../../assets/images/girls/suhana1.jpg',
            '../../assets/images/girls/suhana2.jpg',
            '../../assets/images/girls/suhana3.jpg'
        ]
    ),


];
