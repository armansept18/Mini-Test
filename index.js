//! 1. Program kecil
// Tolong buat satu array / list dari 1 sampai 100. Print semua angka ini dalam urutan terbalik, tetapi ada beberapa peraturan :
// 1. Jangan print angka bilangan prima.
// 2. Ganti angka yang dapat dibagi dengan angka 3 dengan text "Foo".
// 3. Ganti angka yang dapat dibagi dengan angka 5 dengan text "Bar".
// 4. Ganti angka yang dapat dibagi dengan angka 3 dan 5 dengan text "FooBar".
// 5. Print angka menyamping tidak ke bawah.

let array = [];
for (let i = 100; i >= 1; i--) {
  if (i === 1) {
    array.push(i);
    continue;
  }
  let isPrime = true;
  for (let j = 2; j * j <= i; j++) {
    if (i % j === 0) {
      isPrime = false;
      break;
    }
  }
  if (isPrime) {
    continue;
  } else if (i % 3 === 0 && i % 5 === 0) {
    array.push("FooBar");
  } else if (i % 3 === 0) {
    array.push("Foo");
  } else if (i % 5 === 0) {
    array.push("Bar");
  } else {
    array.push(i);
  }
}
const result = array.join(", ");
console.log(result);

//! 2. Menampilkan ramalan cuaca kota Jakarta untuk 5 hari kedepan
// 1. Silakan gunakan API yang disediakan http://openweathermap.org
// 2. Tolong tampilkan output berupa ramalan cuaca kota Jakarta untuk 5 hari ke depan
// 3. Yang ditampilkan hanya 1 suhu per hari
// 4. Soal ini tidak membutuhkan akun berbayar.
console.log("\n", "\n");
const fetchWeather = async () => {
  console.log("Weather Forecast:");
  try {
    const response = await fetch(
      "http://api.openweathermap.org/data/2.5/forecast?q=jakarta,id&units=metric&appid=70b7ea3c34a6194b9caf8a438dc360e4"
    );
    const data = await response.json();
    console.log(data.city.name + ", " + data.city.country);
    const uniqueDates = {};
    const weatherForecast = data.list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000);
      const dateString = `${getWeekday(date)}, ${date.getDate()} ${getMonthName(
        date
      )} ${date.getFullYear()}`;

      if (!uniqueDates[dateString]) {
        uniqueDates[dateString] = true;
        const temperature = item.main.temp.toFixed(2);
        acc.push(`${dateString}: ${temperature}℃`);
      }
      return acc;
    }, []);

    console.log(weatherForecast.join("\n"));
  } catch (err) {
    console.log("Failed Fetch Data!", err);
  }
};

const getWeekday = (date) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[date.getDay()];
};

const getMonthName = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[date.getMonth()];
};

fetchWeather();
