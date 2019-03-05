const changeTime = arg => {
  let time = new Date(0).setUTCSeconds(arg);
  let nycTime = new Date(time).toLocaleString("en-US", {
    timeZone: "America/New_York"
  });

  return nycTime;
};

export default changeTime;
