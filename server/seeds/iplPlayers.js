const players = [
  // ==================== BATSMEN ====================
  {
    name: "Rohit Sharma", age: 37, country: "India", role: "Batsman", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/Rohit Sharma.webp",
    battingStats: { innings: 243, runs: 6628, strikeRate: 130.5, average: 31.2, highScore: 109, fifties: 40, hundreds: 2 }
  },
  {
    name: "Virat Kohli", age: 36, country: "India", role: "Batsman", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/Virat Kohli.png",
    battingStats: { innings: 252, runs: 8004, strikeRate: 130.0, average: 37.3, highScore: 113, fifties: 54, hundreds: 8 }
  },
  {
    name: "Shubman Gill", age: 25, country: "India", role: "Batsman", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/Shubman Gill.webp",
    battingStats: { innings: 120, runs: 3880, strikeRate: 136.8, average: 38.0, highScore: 129, fifties: 26, hundreds: 3 }
  },
  {
    name: "Yashasvi Jaiswal", age: 23, country: "India", role: "Batsman", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/Yashasvi Jaiswal.webp",
    battingStats: { innings: 58, runs: 1958, strikeRate: 163.4, average: 35.6, highScore: 124, fifties: 12, hundreds: 3 }
  },
  {
    name: "Travis Head", age: 31, country: "Australia", role: "Batsman", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/Travis Head.png",
    battingStats: { innings: 62, runs: 2049, strikeRate: 167.1, average: 35.3, highScore: 102, fifties: 14, hundreds: 2 }
  },
  {
    name: "Shreyas Iyer", age: 30, country: "India", role: "Batsman", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/Shreyas Iyer.webp",
    battingStats: { innings: 163, runs: 4599, strikeRate: 127.6, average: 31.9, highScore: 96, fifties: 30, hundreds: 0 }
  },
  {
    name: "Suryakumar Yadav", age: 34, country: "India", role: "Batsman", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Suryakumar Yadav.webp",
    battingStats: { innings: 162, runs: 4176, strikeRate: 148.9, average: 30.7, highScore: 103, fifties: 23, hundreds: 1 }
  },
  {
    name: "Tim David", age: 29, country: "Singapore", role: "Batsman", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Tim David.png",
    battingStats: { innings: 59, runs: 1274, strikeRate: 158.7, average: 31.8, highScore: 75, fifties: 5, hundreds: 0 }
  },
  {
    name: "Tilak Varma", age: 22, country: "India", role: "Batsman", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Tilak Varma.webp",
    battingStats: { innings: 58, runs: 1619, strikeRate: 143.2, average: 35.2, highScore: 84, fifties: 11, hundreds: 0 }
  },
  {
    name: "Ruturaj Gaikwad", age: 28, country: "India", role: "Batsman", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Ruturaj Gaikwad.png",
    battingStats: { innings: 105, runs: 3166, strikeRate: 136.5, average: 33.7, highScore: 101, fifties: 22, hundreds: 2 }
  },
  {
    name: "Priyansh Arya", age: 22, country: "India", role: "Batsman", basePrice: 1, isCapped: false,
    imageUrl: "http://localhost:5000/players/Priyansh Arya.webp",
    battingStats: { innings: 14, runs: 436, strikeRate: 178.7, average: 33.5, highScore: 103, fifties: 2, hundreds: 1 }
  },
  {
    name: "Abhishek Sharma", age: 24, country: "India", role: "Batsman", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Abhishek Sharma.png",
    battingStats: { innings: 48, runs: 1280, strikeRate: 162.2, average: 28.4, highScore: 79, fifties: 8, hundreds: 0 }
  },
  {
    name: "Dewald Brevis", age: 21, country: "South Africa", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Dewald Brevis.png",
    battingStats: { innings: 35, runs: 680, strikeRate: 141.4, average: 20.6, highScore: 55, fifties: 3, hundreds: 0 }
  },
  {
    name: "Ayush Mhatre", age: 19, country: "India", role: "Batsman", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Ayush Mhatre.png",
    battingStats: { innings: 12, runs: 298, strikeRate: 155.2, average: 24.8, highScore: 68, fifties: 2, hundreds: 0 }
  },
  {
    name: "Sarfaraz Khan", age: 27, country: "India", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Sarfaraz Khan.png",
    battingStats: { innings: 42, runs: 850, strikeRate: 135.6, average: 25.0, highScore: 71, fifties: 4, hundreds: 0 }
  },
  {
    name: "Shimron Hetmyer", age: 28, country: "West Indies", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Shimron Hetmyer.webp",
    battingStats: { innings: 72, runs: 1693, strikeRate: 150.5, average: 30.2, highScore: 79, fifties: 9, hundreds: 0 }
  },
  {
    name: "Pathum Nissanka", age: 26, country: "Sri Lanka", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Pathum Nissanka.webp",
    battingStats: { innings: 20, runs: 524, strikeRate: 134.2, average: 27.6, highScore: 72, fifties: 3, hundreds: 0 }
  },
  {
    name: "Nehal Wadhera", age: 24, country: "India", role: "Batsman", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Nehal Wadhera.webp",
    battingStats: { innings: 32, runs: 642, strikeRate: 147.8, average: 22.2, highScore: 67, fifties: 3, hundreds: 0 }
  },
  {
    name: "Naman Dhir", age: 22, country: "India", role: "Batsman", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Naman Dhir.webp",
    battingStats: { innings: 18, runs: 342, strikeRate: 139.0, average: 22.8, highScore: 52, fifties: 1, hundreds: 0 }
  },
  {
    name: "Devdutt Padikkal", age: 24, country: "India", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Devdutt Padikkal.png",
    battingStats: { innings: 72, runs: 1873, strikeRate: 131.8, average: 27.9, highScore: 101, fifties: 12, hundreds: 1 }
  },
  {
    name: "Vaibhav Sooryavanshi", age: 14, country: "India", role: "Batsman", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Vaibhav Sooryavanshi.webp",
    battingStats: { innings: 8, runs: 198, strikeRate: 182.6, average: 24.8, highScore: 58, fifties: 1, hundreds: 0 }
  },
  {
    name: "Angkrish Raghuvanshi", age: 19, country: "India", role: "Batsman", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Angkrish Raghuvanshi.webp",
    battingStats: { innings: 16, runs: 348, strikeRate: 151.3, average: 23.2, highScore: 54, fifties: 1, hundreds: 0 }
  },
  {
    name: "Sai Sudharsan", age: 23, country: "India", role: "Batsman", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Sai Sudharsan.webp",
    battingStats: { innings: 38, runs: 978, strikeRate: 133.5, average: 29.6, highScore: 96, fifties: 7, hundreds: 0 }
  },
  {
    name: "Nitish Rana", age: 30, country: "India", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Nitish Rana.webp",
    battingStats: { innings: 96, runs: 2224, strikeRate: 134.3, average: 25.3, highScore: 87, fifties: 12, hundreds: 0 }
  },
  {
    name: "Finn Allen", age: 26, country: "New Zealand", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Finn Allen.webp",
    battingStats: { innings: 28, runs: 622, strikeRate: 160.1, average: 22.2, highScore: 84, fifties: 3, hundreds: 0 }
  },
  {
    name: "Aiden Markram", age: 30, country: "South Africa", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Aiden Markram.webp",
    battingStats: { innings: 58, runs: 1426, strikeRate: 143.2, average: 27.4, highScore: 90, fifties: 8, hundreds: 0 }
  },
  {
    name: "David Miller", age: 35, country: "South Africa", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/David Miller.webp",
    battingStats: { innings: 122, runs: 2735, strikeRate: 142.5, average: 31.4, highScore: 101, fifties: 14, hundreds: 1 }
  },
  {
    name: "Rovman Powell", age: 30, country: "West Indies", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Rovman Powell.webp",
    battingStats: { innings: 46, runs: 887, strikeRate: 156.0, average: 21.6, highScore: 67, fifties: 3, hundreds: 0 }
  },
  {
    name: "Rinku Singh", age: 27, country: "India", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Rinku Singh.webp",
    battingStats: { innings: 62, runs: 1380, strikeRate: 149.7, average: 32.1, highScore: 74, fifties: 6, hundreds: 0 }
  },
  {
    name: "Rajat Patidar", age: 31, country: "India", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Rajat Patidar.png",
    battingStats: { innings: 44, runs: 1120, strikeRate: 152.4, average: 28.0, highScore: 112, fifties: 5, hundreds: 1 }
  },
  {
    name: "Karun Nair", age: 32, country: "India", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Karun Nair.webp",
    battingStats: { innings: 52, runs: 1024, strikeRate: 133.7, average: 22.7, highScore: 83, fifties: 5, hundreds: 0 }
  },
  {
    name: "Manish Pandey", age: 35, country: "India", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Manish Pandey.webp",
    battingStats: { innings: 172, runs: 3928, strikeRate: 121.3, average: 27.7, highScore: 114, fifties: 25, hundreds: 1 }
  },
  {
    name: "Sameer Rizvi", age: 20, country: "India", role: "Batsman", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Sameer Rizvi.webp",
    battingStats: { innings: 10, runs: 186, strikeRate: 148.8, average: 20.7, highScore: 47, fifties: 0, hundreds: 0 }
  },
  {
    name: "Ajinkya Rahane", age: 36, country: "India", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Ajinkya Rahane.webp",
    battingStats: { innings: 148, runs: 3388, strikeRate: 119.8, average: 25.1, highScore: 98, fifties: 18, hundreds: 0 }
  },
  {
    name: "Aniket Verma", age: 22, country: "India", role: "Batsman", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Aniket Verma.png",
    battingStats: { innings: 8, runs: 164, strikeRate: 142.6, average: 20.5, highScore: 43, fifties: 0, hundreds: 0 }
  },
  {
    name: "Shubham Dubey", age: 24, country: "India", role: "Batsman", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Shubham Dubey.webp",
    battingStats: { innings: 14, runs: 278, strikeRate: 138.3, average: 21.4, highScore: 54, fifties: 1, hundreds: 0 }
  },
  {
    name: "Matthew Short", age: 28, country: "Australia", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Matthew Short.png",
    battingStats: { innings: 22, runs: 488, strikeRate: 155.4, average: 24.4, highScore: 73, fifties: 2, hundreds: 0 }
  },
  {
    name: "Prithvi Shaw", age: 25, country: "India", role: "Batsman", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Prithvi Shaw.webp",
    battingStats: { innings: 78, runs: 2027, strikeRate: 155.8, average: 26.7, highScore: 99, fifties: 10, hundreds: 0 }
  },

  // ==================== BOWLERS ====================
  {
    name: "Jasprit Bumrah", age: 31, country: "India", role: "Bowler", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/Jasprit Bumrah.webp",
    bowlingStats: { innings: 120, wickets: 145, economy: 7.39, average: 21.8, bestFigures: '5/10', fourWickets: 3 }
  },
  {
    name: "Mitchell Starc", age: 35, country: "Australia", role: "Bowler", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/Mitchell Starc.webp",
    bowlingStats: { innings: 40, wickets: 42, economy: 8.82, average: 26.4, bestFigures: '4/15', fourWickets: 1 }
  },
  {
    name: "Kagiso Rabada", age: 30, country: "South Africa", role: "Bowler", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/Kagiso Rabada.webp",
    bowlingStats: { innings: 108, wickets: 127, economy: 8.25, average: 22.9, bestFigures: '4/21', fourWickets: 3 }
  },
  {
    name: "Pat Cummins", age: 32, country: "Australia", role: "Bowler", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/Pat Cummins.png",
    bowlingStats: { innings: 56, wickets: 56, economy: 8.93, average: 28.4, bestFigures: '4/14', fourWickets: 1 }
  },
  {
    name: "Jofra Archer", age: 29, country: "England", role: "Bowler", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/Jofra Archer.webp",
    bowlingStats: { innings: 35, wickets: 46, economy: 7.84, average: 20.0, bestFigures: '3/15', fourWickets: 0 }
  },
  {
    name: "Trent Boult", age: 35, country: "New Zealand", role: "Bowler", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Trent Boult.webp",
    bowlingStats: { innings: 98, wickets: 112, economy: 8.48, average: 23.4, bestFigures: '4/18', fourWickets: 3 }
  },
  {
    name: "Mohammed Shami", age: 34, country: "India", role: "Bowler", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Mohammed Shami.webp",
    bowlingStats: { innings: 98, wickets: 105, economy: 8.56, average: 24.1, bestFigures: '4/16', fourWickets: 2 }
  },
  {
    name: "Arshdeep Singh", age: 26, country: "India", role: "Bowler", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Arshdeep Singh.webp",
    bowlingStats: { innings: 82, wickets: 88, economy: 8.62, average: 25.3, bestFigures: '5/32', fourWickets: 2 }
  },
  {
    name: "Kuldeep Yadav", age: 30, country: "India", role: "Bowler", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Kuldeep Yadav.webp",
    bowlingStats: { innings: 82, wickets: 93, economy: 8.01, average: 22.5, bestFigures: '4/14', fourWickets: 2 }
  },
  {
    name: "Ravi Bishnoi", age: 24, country: "India", role: "Bowler", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Ravi Bishnoi.webp",
    bowlingStats: { innings: 68, wickets: 76, economy: 7.88, average: 22.3, bestFigures: '4/19', fourWickets: 2 }
  },
  {
    name: "Varun Chakaravarthy", age: 33, country: "India", role: "Bowler", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Varun Chakaravarthy.webp",
    bowlingStats: { innings: 72, wickets: 85, economy: 7.62, average: 21.8, bestFigures: '5/20', fourWickets: 3 }
  },
  {
    name: "Mohammed Siraj", age: 30, country: "India", role: "Bowler", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Mohammed Siraj.webp",
    bowlingStats: { innings: 84, wickets: 86, economy: 8.97, average: 28.6, bestFigures: '3/17', fourWickets: 0 }
  },
  {
    name: "Bhuvneshwar Kumar", age: 35, country: "India", role: "Bowler", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Bhuvneshwar Kumar.png",
    bowlingStats: { innings: 162, wickets: 170, economy: 7.65, average: 24.7, bestFigures: '5/19', fourWickets: 4 }
  },
  {
    name: "Yuzvendra Chahal", age: 34, country: "India", role: "Bowler", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Yuzvendra Chahal.webp",
    bowlingStats: { innings: 162, wickets: 205, economy: 7.59, average: 20.5, bestFigures: '5/40', fourWickets: 8 }
  },
  {
    name: "Josh Hazlewood", age: 34, country: "Australia", role: "Bowler", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Josh Hazlewood.png",
    bowlingStats: { innings: 52, wickets: 58, economy: 7.67, average: 19.8, bestFigures: '4/8', fourWickets: 2 }
  },
  {
    name: "Matheesha Pathirana", age: 22, country: "Sri Lanka", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Matheesha Pathirana.webp",
    bowlingStats: { innings: 42, wickets: 56, economy: 8.03, average: 17.6, bestFigures: '4/22', fourWickets: 2 }
  },
  {
    name: "Deepak Chahar", age: 32, country: "India", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Deepak Chahar.webp",
    bowlingStats: { innings: 82, wickets: 80, economy: 7.71, average: 26.5, bestFigures: '6/7', fourWickets: 2 }
  },
  {
    name: "Prasidh Krishna", age: 28, country: "India", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Prasidh Krishna.webp",
    bowlingStats: { innings: 56, wickets: 54, economy: 9.12, average: 30.2, bestFigures: '4/30', fourWickets: 1 }
  },
  {
    name: "T Natarajan", age: 33, country: "India", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/T Natarajan.webp",
    bowlingStats: { innings: 68, wickets: 72, economy: 8.79, average: 26.3, bestFigures: '4/34', fourWickets: 1 }
  },
  {
    name: "Noor Ahmad", age: 19, country: "Afghanistan", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Noor Ahmad.png",
    bowlingStats: { innings: 38, wickets: 44, economy: 7.48, average: 20.8, bestFigures: '4/11', fourWickets: 1 }
  },
  {
    name: "Mayank Yadav", age: 22, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Mayank Yadav.webp",
    bowlingStats: { innings: 18, wickets: 18, economy: 7.22, average: 18.5, bestFigures: '3/14', fourWickets: 0 }
  },
  {
    name: "Gurjapneet Singh", age: 22, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Gurjapneet Singh.png",
    bowlingStats: { innings: 10, wickets: 12, economy: 8.44, average: 22.5, bestFigures: '3/18', fourWickets: 0 }
  },
  {
    name: "Akeal Hosein", age: 29, country: "West Indies", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Akeal Hosein.png",
    bowlingStats: { innings: 24, wickets: 24, economy: 7.82, average: 25.0, bestFigures: '3/22', fourWickets: 0 }
  },
  {
    name: "Lungi Ngidi", age: 29, country: "South Africa", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Lungi Ngidi.webp",
    bowlingStats: { innings: 56, wickets: 58, economy: 9.08, average: 27.7, bestFigures: '4/29', fourWickets: 1 }
  },
  {
    name: "Digvesh Singh Rathi", age: 21, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Digvesh Singh Rathi.webp",
    bowlingStats: { innings: 12, wickets: 14, economy: 7.90, average: 20.4, bestFigures: '3/16', fourWickets: 0 }
  },
  {
    name: "Vipraj Nigam", age: 20, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Vipraj Nigam.webp",
    bowlingStats: { innings: 8, wickets: 9, economy: 8.12, average: 21.6, bestFigures: '2/14', fourWickets: 0 }
  },
  {
    name: "Kartik Tyagi", age: 24, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Kartik Tyagi.webp",
    bowlingStats: { innings: 28, wickets: 24, economy: 9.28, average: 32.5, bestFigures: '3/25', fourWickets: 0 }
  },
  {
    name: "Vijaykumar Vyshak", age: 26, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Vijaykumar Vyshak.webp",
    bowlingStats: { innings: 20, wickets: 22, economy: 8.65, average: 24.8, bestFigures: '3/21', fourWickets: 0 }
  },
  {
    name: "Lockie Ferguson", age: 33, country: "New Zealand", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Lockie Ferguson.webp",
    bowlingStats: { innings: 54, wickets: 58, economy: 8.71, average: 23.9, bestFigures: '5/21', fourWickets: 2 }
  },
  {
    name: "Khaleel Ahmed", age: 27, country: "India", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Khaleel Ahmed.png",
    bowlingStats: { innings: 62, wickets: 62, economy: 8.88, average: 28.4, bestFigures: '4/35', fourWickets: 1 }
  },
  {
    name: "Avesh Khan", age: 28, country: "India", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Avesh Khan.webp",
    bowlingStats: { innings: 72, wickets: 74, economy: 8.96, average: 26.9, bestFigures: '4/24', fourWickets: 1 }
  },
  {
    name: "Harshal Patel", age: 34, country: "India", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Harshal Patel.png",
    bowlingStats: { innings: 94, wickets: 105, economy: 8.77, average: 22.4, bestFigures: '5/27', fourWickets: 4 }
  },
  {
    name: "Mohsin Khan", age: 26, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Mohsin Khan.webp",
    bowlingStats: { innings: 32, wickets: 36, economy: 7.96, average: 22.0, bestFigures: '4/20', fourWickets: 1 }
  },
  {
    name: "Umran Malik", age: 25, country: "India", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Umran Malik.webp",
    bowlingStats: { innings: 38, wickets: 36, economy: 9.44, average: 31.2, bestFigures: '5/25', fourWickets: 1 }
  },
  {
    name: "Vaibhav Arora", age: 24, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Vaibhav Arora.webp",
    bowlingStats: { innings: 26, wickets: 28, economy: 8.52, average: 23.8, bestFigures: '3/18', fourWickets: 0 }
  },
  {
    name: "Sandeep Sharma", age: 31, country: "India", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Sandeep Sharma.webp",
    bowlingStats: { innings: 102, wickets: 98, economy: 8.10, average: 26.4, bestFigures: '5/31', fourWickets: 2 }
  },
  {
    name: "Shreyas Gopal", age: 31, country: "India", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Shreyas Gopal.png",
    bowlingStats: { innings: 62, wickets: 64, economy: 7.95, average: 24.3, bestFigures: '4/14', fourWickets: 2 }
  },
  {
    name: "Jacob Duffy", age: 29, country: "New Zealand", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Jacob Duffy.png",
    bowlingStats: { innings: 16, wickets: 18, economy: 8.34, average: 22.4, bestFigures: '3/21', fourWickets: 0 }
  },
  {
    name: "Navdeep Saini", age: 31, country: "India", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Navdeep Saini.webp",
    bowlingStats: { innings: 56, wickets: 52, economy: 9.05, average: 30.1, bestFigures: '3/17', fourWickets: 0 }
  },
  {
    name: "Nandre Burger", age: 26, country: "South Africa", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Nandre Burger.webp",
    bowlingStats: { innings: 18, wickets: 22, economy: 8.16, average: 21.3, bestFigures: '3/19', fourWickets: 0 }
  },
  {
    name: "Prince Yadav", age: 22, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Prince Yadav.webp",
    bowlingStats: { innings: 8, wickets: 8, economy: 8.55, average: 26.5, bestFigures: '2/18', fourWickets: 0 }
  },
  {
    name: "Shivam Mavi", age: 26, country: "India", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Shivam Mavi.png",
    bowlingStats: { innings: 52, wickets: 50, economy: 9.12, average: 29.8, bestFigures: '4/21', fourWickets: 1 }
  },
  {
    name: "Harpreet Brar", age: 29, country: "India", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Harpreet Brar.webp",
    bowlingStats: { innings: 46, wickets: 46, economy: 7.98, average: 24.7, bestFigures: '3/26', fourWickets: 0 }
  },
  {
    name: "Suyash Sharma", age: 21, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Suyash Sharma.png",
    bowlingStats: { innings: 14, wickets: 16, economy: 7.68, average: 21.4, bestFigures: '3/17', fourWickets: 0 }
  },
  {
    name: "Anrich Nortje", age: 31, country: "South Africa", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Anrich Nortje.webp",
    bowlingStats: { innings: 46, wickets: 52, economy: 8.41, average: 22.7, bestFigures: '4/7', fourWickets: 1 }
  },
  {
    name: "Xavier Bartlett", age: 26, country: "Australia", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Xavier Bartlett.webp",
    bowlingStats: { innings: 16, wickets: 18, economy: 8.88, average: 24.5, bestFigures: '3/24', fourWickets: 0 }
  },
  {
    name: "Tushar Deshpande", age: 29, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Tushar Deshpande.webp",
    bowlingStats: { innings: 38, wickets: 38, economy: 9.24, average: 29.4, bestFigures: '4/30', fourWickets: 1 }
  },
  {
    name: "Jaydev Unadkat", age: 33, country: "India", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Jaydev Unadkat.png",
    bowlingStats: { innings: 98, wickets: 95, economy: 8.22, average: 25.8, bestFigures: '5/28', fourWickets: 2 }
  },
  {
    name: "Blessing Muzarabani", age: 27, country: "Zimbabwe", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Blessing Muzarabani.webp",
    bowlingStats: { innings: 14, wickets: 16, economy: 8.60, average: 23.1, bestFigures: '3/20', fourWickets: 0 }
  },
  {
    name: "Mukesh Choudhary", age: 30, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Mukesh Choudhary.png",
    bowlingStats: { innings: 28, wickets: 28, economy: 8.78, average: 24.6, bestFigures: '4/14', fourWickets: 1 }
  },
  {
    name: "Matt Henry", age: 33, country: "New Zealand", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Matt Henry.png",
    bowlingStats: { innings: 12, wickets: 14, economy: 8.44, average: 22.3, bestFigures: '3/22', fourWickets: 0 }
  },
  {
    name: "Spencer Johnson", age: 28, country: "Australia", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Spencer Johnson.png",
    bowlingStats: { innings: 18, wickets: 22, economy: 8.96, average: 23.4, bestFigures: '3/14', fourWickets: 0 }
  },
  {
    name: "Rahul Chahar", age: 28, country: "India", role: "Bowler", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Rahul Chahar.png",
    bowlingStats: { innings: 66, wickets: 68, economy: 7.82, average: 22.7, bestFigures: '4/27', fourWickets: 2 }
  },
  {
    name: "AM Ghazanfar", age: 18, country: "Afghanistan", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/AM Ghazanfar.webp",
    bowlingStats: { innings: 12, wickets: 14, economy: 7.56, average: 20.2, bestFigures: '3/19', fourWickets: 0 }
  },
  {
    name: "Ashwani Kumar", age: 21, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Ashwani Kumar.webp",
    bowlingStats: { innings: 10, wickets: 10, economy: 8.30, average: 24.2, bestFigures: '2/16', fourWickets: 0 }
  },
  {
    name: "Eshan Malinga", age: 22, country: "Sri Lanka", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Eshan Malinga.png",
    bowlingStats: { innings: 8, wickets: 8, economy: 8.74, average: 25.6, bestFigures: '2/18', fourWickets: 0 }
  },
  {
    name: "Prashant Veer", age: 23, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Prashant Veer.png",
    bowlingStats: { innings: 6, wickets: 6, economy: 8.88, average: 27.0, bestFigures: '2/20', fourWickets: 0 }
  },

  // ==================== ALL-ROUNDERS ====================
  {
    name: "Hardik Pandya", age: 31, country: "India", role: "All-rounder", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/Hardik Pandya.webp",
    allRounderStats: { innings: 148, runs: 3051, strikeRate: 144.3, wickets: 114, economy: 8.96 }
  },
  {
    name: "Rashid Khan", age: 26, country: "Afghanistan", role: "All-rounder", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/Rashid Khan.webp",
    allRounderStats: { innings: 120, runs: 904, strikeRate: 137.6, wickets: 142, economy: 6.84 }
  },
  {
    name: "Ravindra Jadeja", age: 36, country: "India", role: "All-rounder", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Ravindra Jadeja.webp",
    allRounderStats: { innings: 210, runs: 2692, strikeRate: 128.4, wickets: 151, economy: 7.62 }
  },
  {
    name: "Axar Patel", age: 31, country: "India", role: "All-rounder", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Axar Patel.webp",
    allRounderStats: { innings: 142, runs: 1810, strikeRate: 142.6, wickets: 132, economy: 7.44 }
  },
  {
    name: "Washington Sundar", age: 25, country: "India", role: "All-rounder", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Washington Sundar.webp",
    allRounderStats: { innings: 98, runs: 1024, strikeRate: 131.5, wickets: 82, economy: 7.28 }
  },
  {
    name: "Marco Jansen", age: 25, country: "South Africa", role: "All-rounder", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Marco Jansen.webp",
    allRounderStats: { innings: 38, runs: 486, strikeRate: 143.4, wickets: 38, economy: 8.72 }
  },
  {
    name: "Liam Livingstone", age: 31, country: "England", role: "All-rounder", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Liam Livingstone.png",
    allRounderStats: { innings: 56, runs: 1268, strikeRate: 156.2, wickets: 42, economy: 8.56 }
  },
  {
    name: "Krunal Pandya", age: 34, country: "India", role: "All-rounder", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Krunal Pandya.png",
    allRounderStats: { innings: 128, runs: 2122, strikeRate: 136.3, wickets: 84, economy: 7.98 }
  },
  {
    name: "Nitish Kumar Reddy", age: 22, country: "India", role: "All-rounder", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Nitish Kumar Reddy.png",
    allRounderStats: { innings: 30, runs: 656, strikeRate: 148.6, wickets: 22, economy: 9.12 }
  },
  {
    name: "Sunil Narine", age: 36, country: "West Indies", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Suni Narine.webp",
    allRounderStats: { innings: 162, runs: 2584, strikeRate: 163.2, wickets: 172, economy: 6.67 }
  },
  {
    name: "Riyan Parag", age: 23, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Riyan Parag.webp",
    allRounderStats: { innings: 72, runs: 1562, strikeRate: 143.8, wickets: 28, economy: 8.44 }
  },
  {
    name: "Mitchell Marsh", age: 33, country: "Australia", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Mitchell Marsh.webp",
    allRounderStats: { innings: 52, runs: 1224, strikeRate: 151.8, wickets: 30, economy: 9.24 }
  },
  {
    name: "Marcus Stoinis", age: 35, country: "Australia", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Marcus Stoinis.webp",
    allRounderStats: { innings: 98, runs: 2128, strikeRate: 140.2, wickets: 44, economy: 9.08 }
  },
  {
    name: "Shardul Thakur", age: 33, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Shardul Thakur.webp",
    allRounderStats: { innings: 98, runs: 896, strikeRate: 135.7, wickets: 88, economy: 9.43 }
  },
  {
    name: "Shivam Dube", age: 31, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Shivam Dube.png",
    allRounderStats: { innings: 82, runs: 1684, strikeRate: 150.3, wickets: 28, economy: 9.88 }
  },
  {
    name: "Abhishek Sharma", age: 24, country: "India", role: "All-rounder", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Abhishek Sharma.png",
    allRounderStats: { innings: 48, runs: 1280, strikeRate: 162.2, wickets: 18, economy: 8.44 }
  },
  {
    name: "Will Jacks", age: 26, country: "England", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Will Jacks.webp",
    allRounderStats: { innings: 28, runs: 624, strikeRate: 162.5, wickets: 18, economy: 8.22 }
  },
  {
    name: "Glenn Phillips", age: 28, country: "New Zealand", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Glenn Phillips.webp",
    allRounderStats: { innings: 38, runs: 852, strikeRate: 153.2, wickets: 22, economy: 8.68 }
  },
  {
    name: "Rachin Ravindra", age: 25, country: "New Zealand", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Rachin Ravindra.webp",
    allRounderStats: { innings: 22, runs: 488, strikeRate: 142.2, wickets: 14, economy: 7.88 }
  },
  {
    name: "Mitchell Santner", age: 33, country: "New Zealand", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Mitchell Santner.webp",
    allRounderStats: { innings: 54, runs: 582, strikeRate: 122.4, wickets: 48, economy: 7.56 }
  },
  {
    name: "Cameron Green", age: 26, country: "Australia", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Cameron Green.webp",
    allRounderStats: { innings: 28, runs: 558, strikeRate: 147.6, wickets: 12, economy: 9.36 }
  },
  {
    name: "Jason Holder", age: 33, country: "West Indies", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Jason Holder.webp",
    allRounderStats: { innings: 78, runs: 788, strikeRate: 131.6, wickets: 74, economy: 8.64 }
  },
  {
    name: "Wanindu Hasaranga", age: 27, country: "Sri Lanka", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Wanindu Hasaranga.webp",
    allRounderStats: { innings: 58, runs: 548, strikeRate: 138.4, wickets: 64, economy: 7.94 }
  },
  {
    name: "Jacob Bethell", age: 21, country: "England", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Jacob Bethell.png",
    allRounderStats: { innings: 18, runs: 428, strikeRate: 155.6, wickets: 8, economy: 8.88 }
  },
  {
    name: "Cooper Connolly", age: 21, country: "Australia", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Cooper Connolly.webp",
    allRounderStats: { innings: 14, runs: 284, strikeRate: 138.4, wickets: 10, economy: 8.64 }
  },
  {
    name: "Ravisrinivasan Sai Kishore", age: 28, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Ravi Sai Kishore.webp",
    allRounderStats: { innings: 52, runs: 268, strikeRate: 112.6, wickets: 54, economy: 7.72 }
  },
  {
    name: "Shashank Singh", age: 32, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Shashank Singh.webp",
    allRounderStats: { innings: 46, runs: 924, strikeRate: 162.0, wickets: 4, economy: 10.2 }
  },
  {
    name: "Ashutosh Sharma", age: 24, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Ashutosh Sharma.webp",
    allRounderStats: { innings: 24, runs: 488, strikeRate: 172.4, wickets: 8, economy: 9.44 }
  },
  {
    name: "Azmatullah Omarzai", age: 23, country: "Afghanistan", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Azmatullah Omarzai.webp",
    allRounderStats: { innings: 22, runs: 388, strikeRate: 144.2, wickets: 18, economy: 8.76 }
  },
  {
    name: "Corbin Bosch", age: 28, country: "South Africa", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Corbin Bosch.webp",
    allRounderStats: { innings: 16, runs: 248, strikeRate: 142.5, wickets: 14, economy: 9.12 }
  },
  {
    name: "Jamie Overton", age: 30, country: "England", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Jamie Overton.png",
    allRounderStats: { innings: 12, runs: 188, strikeRate: 155.4, wickets: 12, economy: 9.48 }
  },
  {
    name: "Arjun Tendulkar", age: 25, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/ArjunTendulkar.webp",
    allRounderStats: { innings: 18, runs: 128, strikeRate: 118.6, wickets: 16, economy: 8.88 }
  },
  {
    name: "Ramandeep Singh", age: 27, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Ramandeep Singh.webp",
    allRounderStats: { innings: 36, runs: 548, strikeRate: 152.8, wickets: 14, economy: 9.44 }
  },
  {
    name: "Venkatesh Iyer", age: 30, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Venkatesh Iyer.png",
    allRounderStats: { innings: 68, runs: 1488, strikeRate: 142.2, wickets: 22, economy: 9.68 }
  },
  {
    name: "Abdul Samad", age: 23, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Abdul Samad.webp",
    allRounderStats: { innings: 48, runs: 724, strikeRate: 148.4, wickets: 12, economy: 9.12 }
  },
  {
    name: "Anukul Roy", age: 24, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Anukul Roy.webp",
    allRounderStats: { innings: 28, runs: 244, strikeRate: 128.4, wickets: 22, economy: 7.88 }
  },
  {
    name: "Anshul Kamboj", age: 23, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Anshul Kamboj.png",
    allRounderStats: { innings: 12, runs: 118, strikeRate: 132.6, wickets: 12, economy: 8.64 }
  },
  {
    name: "Ayush Badoni", age: 24, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Ayush Badoni.webp",
    allRounderStats: { innings: 42, runs: 728, strikeRate: 146.2, wickets: 8, economy: 9.24 }
  },
  {
    name: "Sherfane Rutherford", age: 28, country: "West Indies", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Sherfane Rutherford.webp",
    allRounderStats: { innings: 32, runs: 588, strikeRate: 154.3, wickets: 6, economy: 9.84 }
  },
  {
    name: "Kamindu Mendis", age: 25, country: "Sri Lanka", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Kamindu Mendis.png",
    allRounderStats: { innings: 18, runs: 368, strikeRate: 136.3, wickets: 12, economy: 7.92 }
  },
  {
    name: "Romario Shepherd", age: 29, country: "West Indies", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Romario Shephard.png",
    allRounderStats: { innings: 36, runs: 488, strikeRate: 158.4, wickets: 32, economy: 9.44 }
  },
  {
    name: "Jayant Yadav", age: 34, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Ravi Sai Kishore.webp",
    allRounderStats: { innings: 62, runs: 488, strikeRate: 120.0, wickets: 58, economy: 7.98 }
  },
  {
    name: "Auqib Nabi Dar", age: 22, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Auqib Nabi.webp",
    allRounderStats: { innings: 8, runs: 88, strikeRate: 124.0, wickets: 8, economy: 8.24 }
  },

  // ==================== WICKET-KEEPERS ====================
  {
    name: "Rishabh Pant", age: 27, country: "India", role: "Wicket-keeper", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/Rishabh Pant.webp",
    keeperStats: { innings: 112, runs: 3284, strikeRate: 148.8, average: 35.3, dismissals: 98 }
  },
  {
    name: "KL Rahul", age: 33, country: "India", role: "Wicket-keeper", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/KL Rahul.webp",
    keeperStats: { innings: 158, runs: 4988, strikeRate: 134.6, average: 36.8, dismissals: 112 }
  },
  {
    name: "MS Dhoni", age: 43, country: "India", role: "Wicket-keeper", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/MS Dhoni.png",
    keeperStats: { innings: 264, runs: 5082, strikeRate: 135.9, average: 38.1, dismissals: 195 }
  },
  {
    name: "Jos Buttler", age: 34, country: "England", role: "Wicket-keeper", basePrice: 2, isCapped: true,
    imageUrl: "http://localhost:5000/players/Jos Buttler.webp",
    keeperStats: { innings: 142, runs: 4686, strikeRate: 148.8, average: 37.6, dismissals: 86 }
  },
  {
    name: "Sanju Samson", age: 30, country: "India", role: "Wicket-keeper", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Sanju Samson.png",
    keeperStats: { innings: 168, runs: 4613, strikeRate: 141.2, average: 33.4, dismissals: 118 }
  },
  {
    name: "Tristan Stubbs", age: 25, country: "South Africa", role: "Wicket-keeper", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Tristan Stubbs.webp",
    keeperStats: { innings: 38, runs: 882, strikeRate: 152.3, average: 26.7, dismissals: 28 }
  },
  {
    name: "Ishan Kishan", age: 26, country: "India", role: "Wicket-keeper", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Ishan Kishan.png",
    keeperStats: { innings: 108, runs: 2838, strikeRate: 135.8, average: 29.0, dismissals: 76 }
  },
  {
    name: "Heinrich Klaasen", age: 33, country: "South Africa", role: "Wicket-keeper", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Heinrich Klaasen.png",
    keeperStats: { innings: 74, runs: 2116, strikeRate: 157.2, average: 32.6, dismissals: 52 }
  },
  {
    name: "Jitesh Sharma", age: 30, country: "India", role: "Wicket-keeper", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Jitesh Sharma.png",
    keeperStats: { innings: 48, runs: 1024, strikeRate: 155.4, average: 27.7, dismissals: 38 }
  },
  {
    name: "Josh Inglis", age: 30, country: "Australia", role: "Wicket-keeper", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Josh Inglis.webp",
    keeperStats: { innings: 32, runs: 788, strikeRate: 150.6, average: 28.1, dismissals: 26 }
  },
  {
    name: "Nicholas Pooran", age: 29, country: "West Indies", role: "Wicket-keeper", basePrice: 1, isCapped: true,
    imageUrl: "http://localhost:5000/players/Nicholas Pooran.webp",
    keeperStats: { innings: 96, runs: 2448, strikeRate: 162.8, average: 30.2, dismissals: 68 }
  },
  {
    name: "Quinton de Kock", age: 32, country: "South Africa", role: "Wicket-keeper", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Quinton de Kock.webp",
    keeperStats: { innings: 98, runs: 2882, strikeRate: 136.8, average: 33.0, dismissals: 74 }
  },
  {
    name: "Ryan Rickelton", age: 26, country: "South Africa", role: "Wicket-keeper", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Ryan Rickelton.webp",
    keeperStats: { innings: 16, runs: 412, strikeRate: 145.2, average: 27.5, dismissals: 12 }
  },
  {
    name: "Dhruv Jurel", age: 24, country: "India", role: "Wicket-keeper", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Dhruv Jurel.webp",
    keeperStats: { innings: 28, runs: 548, strikeRate: 144.7, average: 24.0, dismissals: 22 }
  },
  {
    name: "Prabhsimran Singh", age: 23, country: "India", role: "Wicket-keeper", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Prabhsimran Singh.webp",
    keeperStats: { innings: 32, runs: 688, strikeRate: 152.4, average: 24.6, dismissals: 18 }
  },
  {
    name: "Abishek Porel", age: 22, country: "India", role: "Wicket-keeper", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Abishek Porel.webp",
    keeperStats: { innings: 18, runs: 358, strikeRate: 138.2, average: 21.1, dismissals: 14 }
  },
  {
    name: "Tim Seifert", age: 30, country: "New Zealand", role: "Wicket-keeper", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Tim Seifert.webp",
    keeperStats: { innings: 22, runs: 446, strikeRate: 146.4, average: 22.3, dismissals: 18 }
  },
  {
    name: "Matthew Breetzke", age: 24, country: "South Africa", role: "Wicket-keeper", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Matthew Breetzke.webp",
    keeperStats: { innings: 14, runs: 298, strikeRate: 139.3, average: 22.9, dismissals: 10 }
  },
  {
    name: "Kartik Sharma", age: 22, country: "India", role: "Wicket-keeper", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Kartik Sharma.png",
    keeperStats: { innings: 8, runs: 148, strikeRate: 132.1, average: 18.5, dismissals: 6 }
  },
  {
    name: "Donovan Ferreira", age: 27, country: "South Africa", role: "Wicket-keeper", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Donovan Ferreira.webp",
    keeperStats: { innings: 16, runs: 322, strikeRate: 143.8, average: 21.5, dismissals: 12 }
  },
  {
    name: "Urvil Patel", age: 25, country: "India", role: "Wicket-keeper", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Urvil Patel.png",
    keeperStats: { innings: 10, runs: 198, strikeRate: 178.4, average: 22.0, dismissals: 8 }
  },
  {
    name: "Mukul Choudhary", age: 22, country: "India", role: "Wicket-keeper", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Mukul Choudhary.webp",
    keeperStats: { innings: 8, runs: 112, strikeRate: 124.4, average: 14.0, dismissals: 6 }
  },
  {
    name: "Phil Salt", age: 28, country: "England", role: "Wicket-keeper", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Phil Salt.png",
    keeperStats: { innings: 28, runs: 788, strikeRate: 163.4, average: 30.3, dismissals: 18 }
  },
  // ==================== MISSING PLAYERS ====================
  {
    name: "Arshad Khan", age: 24, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Arshad Khan.webp",
    bowlingStats: { innings: 14, wickets: 14, economy: 8.44, average: 24.2, bestFigures: '3/22', fourWickets: 0 }
  },
  {
    name: "Jordan Cox", age: 24, country: "England", role: "Wicket-keeper", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/jordan cox.png",
    keeperStats: { innings: 12, runs: 248, strikeRate: 142.5, average: 22.5, dismissals: 8 }
  },
  {
    name: "Arshad Madhwal", age: 27, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/madhwal.png",
    bowlingStats: { innings: 28, wickets: 32, economy: 8.62, average: 22.8, bestFigures: '5/5', fourWickets: 2 }
  },
  {
    name: "Mitchell Owen", age: 24, country: "Australia", role: "All-rounder", basePrice: 0.25, isCapped: true,
    imageUrl: "http://localhost:5000/players/Mitch Owen.webp",
    allRounderStats: { innings: 14, runs: 312, strikeRate: 168.6, wickets: 4, economy: 9.88 }
  },
  {
    name: "Praful Hinge", age: 22, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/raful Hinge.png",
    bowlingStats: { innings: 8, wickets: 8, economy: 8.24, average: 25.0, bestFigures: '2/19', fourWickets: 0 }
  },
  {
    name: "Sakib Hussain", age: 23, country: "India", role: "Bowler", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/sakib hussain.png",
    bowlingStats: { innings: 6, wickets: 6, economy: 8.88, average: 27.2, bestFigures: '2/21', fourWickets: 0 }
  },
  {
    name: "Shahrukh Khan", age: 29, country: "India", role: "All-rounder", basePrice: 0.25, isCapped: false,
    imageUrl: "http://localhost:5000/players/Shahrukh Khan.webp",
    allRounderStats: { innings: 48, runs: 788, strikeRate: 162.4, wickets: 4, economy: 10.2 }
  },
]

module.exports = players