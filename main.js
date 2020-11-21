var time;
var game = {
    correct:0,
    incorrect:0,
    currentWord:0,
    saveWord:null,
    count:20,
    countDown:()=>{
        game.count--;
        $('#time').html(game.count);
        if(game.count<=0){
            game.result();
        }
    },
    getData:()=>{
        return fetch('data.json')
        .then(res => res.json())
        .then(data => data.word);
    },
    loadData: async ()=>{
        var data = await game.getData();
        var word = data.split(',');
        game.saveWord = word;
        for (let i = 0; i < word.length; i++) {
            const item = word[i];
            $('#soal').append('<span class="'+i+'">'+item+'</span>');
        }
        game.check();
    }, 
    check:()=>{
        $('#input').keypress(function (e) { 
            if(e.which == 32){
                var value = $(this).val();
                $(this).val("");
                if(value == game.saveWord[game.currentWord]){
                    game.correct++;
                    $('.'+game.currentWord).addClass('correct');
                    $('#correct').text(game.correct);
                } else {
                    game.incorrect++;
                    $('.'+game.currentWord).addClass('incorrect');
                    $('#incorrect').text(game.incorrect);
                }
                game.currentWord++;
            }
        });
    },   
    result:()=>{
        $('#input').remove();
        $('#app').remove();
        $('#result').text('Nilai: '+game.correct);
        game.count==0;
        clearInterval(time);
    }
}

$('#main').hide();
$('#play').click(() => {
    var delay = 3;
    $('#input').prop('disabled', true);
    $('#main').show();
    $(this).hide();
    $('#play').remove();
    var waktu = setInterval(()=>{
        delay--;
        $('#delay').html(delay);
    },1000)
    game.loadData();
    setTimeout(()=>{
        $('#input').prop('disabled', false);
        time = setInterval(game.countDown,1000);
        clearInterval(waktu);
        $('#delay').remove();
        $('#input').focus();
    },3000);
    
})
