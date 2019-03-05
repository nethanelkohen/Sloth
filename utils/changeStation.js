const changeStation = arg => {
  switch (arg) {
    case "R01":
      return "Ditmars";
      break;
    case "R03":
      return "Astoria Blvd";
      break;
    case "R04":
      return "30 Av";
      break;
    case "R05":
      return "Broadway";
      break;
    case "R06":
      return "36 Av";
      break;
    case "R08":
      return "39 Av";
      break;
    case "R09":
      return "Queensboro Plaza";
      break;
    default:
    // code block
  }
};

export default changeStation;
