$(document).ready(function(){
    var count = 0;
    var punctuation = 0;
    var points = {
        "easy": 100,
        "medium": 200,
        "hard": 300
    };
    function checkNumber(){
        $(".punctuation").text(punctuation+" Points")
        if(count==9){
            $(".restart").css("visibility","visible");
        }
    }

    $('.question').click(function(){
        var difficulty = $(this).attr('difficulty');
        var category = $(this).attr('category');
        var self = $(this);
        $.get("https://opentdb.com/api.php?amount=1&category="+category+"&difficulty="+difficulty+"&type=multiple", displayQuestion);
        function displayQuestion(data){
            var text = "<p>"+data.results[0].question+"</p><div category class='form-check form-check-inline correct"+difficulty+category+"'><input class='form-check-input' type='radio' name='inlineRadioOptions' value='option1'><label class='form-check-label rightAnswer' for='correct'>"+data.results[0].correct_answer+"</label></div><div class='form-check form-check-inline incorrect"+difficulty+category+"'><input class='form-check-input' type='radio' name='inlineRadioOptions' value='option2'><label class='form-check-label' for='incorrect'>"+data.results[0].incorrect_answers[0]+"</label></div><div class='form-check form-check-inline incorrect"+difficulty+category+"'><input class='form-check-input' type='radio' name='inlineRadioOptions' value='option1'><label class='form-check-label' for='incorrect'>"+data.results[0].incorrect_answers[1]+"</label></div><div class='form-check form-check-inline incorrect"+difficulty+category+"'><input class='form-check-input incorrect' type='radio' name='inlineRadioOptions' value='option1'><label class='form-check-label' for='incorrect'>"+data.results[0].incorrect_answers[2]+"</label></div>";
            self.parent().addClass("displayed mb-4");
            self.parent().html(text);
            self.remove();
            var self2 = $(".correct"+difficulty+category)
            var self3 = $(".incorrect"+difficulty+category)
            self2.on("click", function(){
                self2.parent().css("background-color","green");
                self2.parent().css("color","white");
                self2.parent().html("Correct");
                self2.siblings().remove();
                self2.remove();
                count += 1;
                punctuation += points[difficulty]
                checkNumber();
            });
            self3.on("click", function(){
                console.log("incorrect")
                self2.parent().css("background-color","red");
                self2.parent().css("color","white");
                var rightAnswer = $(".rightAnswer").text()
                console.log(rightAnswer)
                self2.parent().html("Incorrect. Right answer was: "+rightAnswer);
                self2.siblings().remove();
                self2.remove();
                count += 1;
                punctuation -= points[difficulty]
                checkNumber();
            });
        };
    });


})
