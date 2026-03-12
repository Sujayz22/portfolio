fetch("https://wakatime.com/api/v1/users/Sujayz/stats/all_time", {
  method: "GET",
  headers: {
    "Origin": "https://sujayz22.github.io"
  }
}).then(res => res.json()).then(console.log).catch(console.error);
