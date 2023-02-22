export const localStorageUser = "vercera-user"

const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  export const getReadableTime = (ISODate) => {
    const readable = new Date(ISODate);        
    const month = readable.getMonth();
    const date = readable.getDate();        
    const year = readable.getFullYear();
  
    const monthLong = months[month];
    const fulldate = monthLong + " " + date + ", " + year;
    return fulldate;
  };