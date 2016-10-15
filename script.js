//gra kamień nożyce paper

    var newGameBtn = document.getElementById('js-newGameButton');
    
    newGameBtn.addEventListener('click', newGame);

    var pickRock = document.getElementById('js-playerPick_rock'),
        pickPaper = document.getElementById('js-playerPick_paper'),
        pickScissors = document.getElementById('js-playerPick_scissors');

    pickRock.addEventListener('click', function() { playerPick('rock') });
    pickPaper.addEventListener('click', function() { playerPick('paper') });
    pickScissors.addEventListener('click', function() { playerPick('scissors') });   

    //logika gry

    //wartości początkowe

    var gameState = 'nonStarted'; 
    var player = {
            name: '',
            score: 0,
        };
    var computer = {
            score: 0,
        };

    //wyświetlanie elementów gry
    var newGameBtn = document.getElementById('js-newGameButton') //<-- to już wcześniej było deklarowane, trzeba drugi raz/ albo czy przeszkdza?
    var newGameElem = document.getElementById('js-newGameElement'),
        pickElem = document.getElementById('js-playerPickElement'),
        resultsElem = document.getElementById('js-resultsTableElement');
    var finalRes = document.getElementById('js-finalResult');

    function setGameElements() {
        switch(gameState) {
            case 'started':
                newGameElem.style.display = 'none';
                pickElem.style.display = 'block';
                resultsElem.style.display = 'block';
                finalRes.style.display = 'none';
              break;
            case 'ended':
                finalRes.style.display = 'block';
                newGameBtn.innerText = 'Zagraj jeszcze raz';
                resultsElem.style.display = 'block';
            case 'nonStarted':
            default:
                newGameElem.style.display = 'block';
                pickElem.style.display = 'none';
        }
    }
    setGameElements();  

    //rozpoczęcie gry

    var playerPointsElem = document.getElementById('js-playerPoints'),
        playerNameElem = document.getElementById('js-playerName'),
        computerPointsElem = document.getElementById('js-computerPoints');


    function newGame() {
        player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
        if (player.name) {
            player.score = computer.score = 0;
            gameState = 'started';
            setGameElements();

            playerNameElem.innerHTML = player.name;
        
            setGamePoints();
        }   
    }              

    //wybór gracza

    function playerPick(playerPick) {
        console.log(playerPick);
    }

    //losowanie wyboru komputera
    function getComputerPick() {
        var possiblePicks = ['rock', 'paper', 'scissors'];
        return possiblePicks[Math.floor(Math.random()*3)];
    }

    var playerPickElem = document.getElementById('js-playerPick'),
        computerPickElem = document.getElementById('js-computerPick'),
        playerResultElem = document.getElementById('js-playerResult'),
        computerResultElem = document.getElementById('js-computerResult');

    function playerPick(playerPick) {
        var computerPick = getComputerPick();
    
        playerPickElem.innerHTML = playerPick;
        computerPickElem.innerHTML = computerPick;
    
        checkRoundWinner(playerPick, computerPick);
        checkGameWinner();
    }

    //logika gry i przyznawanie punktów
   
    function setGamePoints() {
                playerPointsElem.innerHTML = player.score;
                computerPointsElem.innerHTML = computer.score;
            }

    function checkRoundWinner(playerPick, computerPick) {
        playerResultElem.innerHTML = computerResultElem.innerHTML= '';

        var winnerIs = 'player';

            if (playerPick == computerPick) {
                winnerIs = 'noone'; // remis
            } else if (
                (computerPick == 'rock' &&  playerPick == 'scissors') ||
                (computerPick == 'scissors' &&  playerPick == 'paper') ||
                (computerPick == 'paper' &&  playerPick == 'rock') ) {
        
                winnerIs = 'computer';
            }

            if (winnerIs == 'player') {
                playerResultElem.innerHTML = "Wygrana!";
                player.score++;
            } else if (winnerIs == 'computer') {
                computerResultElem.innerHTML = "Wygrana!";
                computer.score++;
            } else if (winnerIs == 'noone') {
                playerResultElem.innerHTML = "Remis";
                computerResultElem.innerHTML = "Remis";
            }
        setGamePoints();
    }
        function checkGameWinner() {
        if (player.score == 10) {
            gameState = 'ended';
            setGameElements();
            finalRes.innerHTML = ('wygrał ' +player.name+ '<br />wynik to: ' +player.score+ ' vs. ' +computer.score);
        } else if (computer.score == 10) {
            gameState = 'ended';
            setGameElements();
            finalRes.innerHTML = ('wygrał komputer <br /> wynik to: ' +player.score+ ' do ' +computer.score);
        }
    }