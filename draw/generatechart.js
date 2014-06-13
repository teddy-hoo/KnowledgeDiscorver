var generateChart = function(){
          var btn = $("#inputbutton");
          btn.button("loading");
          if(shadowbox === null){
            shadowbox = new ShadowBox();
          }
          shadowbox.setShadow(waitTime);
          shadowbox.add();
          var word = $("#wordinput").val();
          if(word == ""){
            $("#canvas").hide("clip");
            $("#wordlist").hide("clip");
            btn.button("reset");
            shadowbox.remove();
            return;
          }
          var words = word.split(',');
          var data = {
            "words": words
          };
          $.post("", JSON.stringify(data), function(ngramdata){
            timeUsed = shadowbox.stopCount();
            shadowbox.remove();
            btn.button("reset");
            var wordsdata = JSON.parse(ngramdata);
            var dataforrender = [];
            var wordcount = wordsdata.length;
            var timelength = wordsdata[0].timeseries.length;
            for(var i = 0; i < timelength; ++i){
              var subdata = {};
              for(var j = 0; j < wordcount; ++j){
                subdata[wordsdata[j].ngram] = wordsdata[j].timeseries[i];
              }
              subdata["time"] = (18000000 + 10000 * i).toString();
              dataforrender.push(subdata);
            }
            if(plot === null){
              plot = new Draw();
              plot.setData(dataforrender);
              plot.render();
            }            
            else{
              plot.setData(dataforrender);
              plot.update();
            }
            $("#canvas").show("clip");
            
            $("#wordlist").show("clip");
          });
          $("#canvas").hide("clip");
          $("#wordlist").hide("clip");
          $("#wordlist").empty();
          $newol = $('<ol />');
            $newol.attr({
              "class": "breadcrumb"
            });
          for(var i = 0; i < words.length; ++i){            
            $newli = $('<li />');
            $newspan = $('<span />');
            $newspan.attr({
              "class": wordtagcss[parseInt(Math.random() * 5)]
            });
            $newspan.text(words[i]);
            $newli.append($newspan);
            $newol.append($newli);
            $("#wordlist").append($newol); 
          }
        };