const originalText = document.getElementById("original-conversation");
const changeButton = document.getElementById("change-button");
const outputText = document.getElementById("simplified-conversation");

var text = null;

changeButton.addEventListener("click", () => {
    // Text in input
    text = originalText.value.trim();

    // Text into array
    var paragraphs = text.split(/(\[[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9] [0-9][0-9]:[0-9][0-9] [pa]\. m\.\] [^:]*: )/g);
    
    //Array for input
    var newParagraphs = "";
    
    // This two variables help eliminating repeated date entries
    var splitDateAndName;
    var currentName;
    
    var lastTimeStampt;
    var lastTimeFormat;
    var lastTime;
    var repeated;

    paragraphs.forEach((paragraph, i) => {
        if (/(\[[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9] [0-9][0-9]:[0-9][0-9] [pa]\. m\.\] .*: )/g.test(paragraph)) {
            splitDateAndName = paragraph.split(/(\[[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9] [0-9][0-9]:[0-9][0-9] [pa]\. m\.\])/g);
            
            if (currentName == splitDateAndName[2]) {
                lastTime = paragraph.substring(12, 17);
                lastTimeFormat = paragraph.substring(18, 23);
                repeated = true;
                paragraphs.splice(i, 1);
            } else {

                if (repeated == true) {
                    var text = paragraphs[lastTimeStampt]
                    var index = 22;

                    if (lastTimeFormat == "p. m." && `${parseInt(lastTime)}` != "12") {
                        var minutes = lastTime.substring(3);
                        lastTime = `${parseInt(lastTime) + 12}:${minutes}`;
                    } else if (lastTimeFormat == "a. m." && `${parseInt(lastTime)}` == "12") {
                        var minutes = lastTime.substring(3);
                        lastTime = `00:${minutes}`;
                    }

                    paragraphs[lastTimeStampt] = text.substring(0, index) + lastTime + text.substring(index + lastTime.length);
                    repeated = false;
                }
                
                if (paragraph.substring(18, 23) == "p. m.") {
                    if (paragraph.substring(12, 14) != "12") {
                        var insert = parseInt(paragraph.substring(12, 14)) + 12;
                        insert = `${insert}`;
                        var text = paragraph
                        var index = 12;

                        paragraph = text.substring(0, index) + insert + text.substring(index + insert.length);
                    }
                    lastTimeFormat = "p. m.";
                } else if (paragraph.substring(18, 23) == "a. m.") {
                    if (paragraph.substring(12, 14) == "12") {
                        var minutes = `${paragraph.substring(16, 18)}`;
                        var insert = `00:${minutes}`;

                        var text = paragraph
                        var index = 12;
                        paragraph = text.substring(0, index) + insert + text.substring(index + insert.length);
                    }
                    lastTimeFormat = "a. m.";
                }

                if (paragraph.substring(24, 27) != " : ") {
                    var insert = "";

                    var text = paragraph
                    var index = 24;
                    paragraph = text.substring(0, index)
                }

                var day = paragraph.substring(1,3);
                var month = paragraph.substring(4,6);

                var text = paragraph
                var index = 1;
                paragraph = text.substring(0, index) + month + text.substring(index + month.length);

                text = paragraph
                index = 4;
                paragraph = text.substring(0, index) + day + text.substring(index + day.length);

                paragraphs[i] = "\nWhatsApp " + paragraph.replace("[", "<").replace("]", ">").replace("> : ", "> Me").replace(" a. m.", "").replace(" p. m.", "") + "\n";

                currentName = splitDateAndName[2];
                lastTimeStampt = i;
            }
            
        }
    });

    paragraphs.forEach((paragraph) => {
        newParagraphs += paragraph;
    });

    outputText.innerHTML = newParagraphs.trim();
});

// /(\[[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9] [0-9][0-9]:[0-9][0-9] [pa]\. m\.\] .*: )/g
