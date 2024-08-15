$(document).ready(function () {
  var item, tile, author, publisher, bookLink, bookImg;
  var outputList = document.getElementById("list-output");
  var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  var apiKey = "key=AIzaSyDtXC7kb6a7xKJdm_Le6_BYoY5biz6s8Lw";
  var placeHldr = '<img src="https://via.placeholder.com/150">';
  var searchData;

  //listener for search button
  $("#search").click(function () {
    outputList.innerHTML = ""; //empty html output
    document.body.style.backgroundImage = "url('')";
    searchData = $("#search-box").val();
    //handling empty search input field
    if (searchData === "" || searchData === null) {
      displayError();
    } else {
      // console.log(searchData);
      // $.get("https://www.googleapis.com/books/v1/volumes?q="+searchData, getBookData()});
      $.ajax({
        url: bookUrl + searchData,
        dataType: "json",
        success: function (response) {
          console.log(response);
          if (response.totalItems === 0) {
            alert("no result!.. try again");
          } else {
            $("#title").animate({ "margin-top": "5px" }, 1000); //search box animation
            $(".categories-section").css("visibility", "visible");
            $(".categories-section").css("height", "115vh");
            displayResults(response);
          }
        },
        error: function () {
          alert("Something went wrong, make sure you're connected to the internet\n" + "Try again!");
        },
      });
    }
    $("#search-box").val(""); //clearn search box
  });

  /*
   * function to display result in index.html
   * @param response
   */
  function displayResults(response) {
    for (var i = 0; i < response.items.length; i += 4) {
      item = response.items[i];
      title1 = item.volumeInfo.title;
      author1 = item.volumeInfo.authors;
      publisher1 = item.volumeInfo.publisher;
      bookLink1 = item.volumeInfo.previewLink;
      bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier;
      bookImg1 = item.volumeInfo.imageLinks
        ? item.volumeInfo.imageLinks.thumbnail
        : placeHldr;

      item2 = response.items[i + 1];
      title2 = item2.volumeInfo.title;
      author2 = item2.volumeInfo.authors;
      publisher2 = item2.volumeInfo.publisher;
      bookLink2 = item2.volumeInfo.previewLink;
      bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier;
      bookImg2 = item2.volumeInfo.imageLinks
        ? item2.volumeInfo.imageLinks.thumbnail
        : placeHldr;

      item3 = response.items[i + 2];
      title3 = item3.volumeInfo.title;
      author3 = item3.volumeInfo.authors;
      publisher3 = item3.volumeInfo.publisher;
      bookLink3 = item3.volumeInfo.previewLink;
      bookIsbn3 = item3.volumeInfo.industryIdentifiers[1].identifier;
      bookImg3 = item3.volumeInfo.imageLinks
        ? item3.volumeInfo.imageLinks.thumbnail
        : placeHldr;

      item4 = response.items[i + 3];
      title4 = item4.volumeInfo.title;
      author4 = item4.volumeInfo.authors;
      publisher4 = item4.volumeInfo.publisher;
      bookLink4 = item4.volumeInfo.previewLink;
      bookIsbn4 = item4.volumeInfo.industryIdentifiers[1].identifier;
      bookImg4 = item4.volumeInfo.imageLinks
        ? item4.volumeInfo.imageLinks.thumbnail
        : placeHldr;


      // in production code, item.text should have the HTML entities escaped.
      outputList.innerHTML +=
        '<div class="items">' +
        formatOutput(
          bookImg1,
          title1,
          author1,
          publisher1,
          bookLink1,
          bookIsbn
        ) +
        formatOutput(
          bookImg2,
          title2,
          author2,
          publisher2,
          bookLink2,
          bookIsbn2
        ) +
        formatOutput(
          bookImg3,
          title3,
          author3,
          publisher3,
          bookLink3,
          bookIsbn3
        ) +
        formatOutput(
          bookImg4,
          title4,
          author4,
          publisher4,
          bookLink4,
          bookIsbn4
        ) +
        "</div>";

      console.log(outputList);
    }
  }

  /*
   * card element formatter using es6 backticks and templates (indivial card)
   * @param bookImg title author publisher bookLink
   * @return htmlCard
   */
  function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn) {
    // console.log(title + ""+ author +" "+ publisher +" "+ bookLink+" "+ bookImg)
    var viewUrl = "../book.html?isbn=" + bookIsbn; //constructing link for bookviewer
    var htmlCard = `
    <div class="item">
    <a href="../images/AI/A-Course-in-Machine-Learning_.jpg" data-lightbox="myGallery"><img src="${bookImg}" alt=""></a>
    <div class="bottom">
       <div class="detail">
         <h3>${title}</h3>
         <div class="author">
             <img src="../images/member-1.png" alt="">
             <div class="right">
                 <h6>${author}</h6>
                 <p>06/08/2024</p>
             </div>
         </div>
       </div>
         <button><a target="_blank" href="${viewUrl}">Detail</a></button>
    </div> 
 </div>`;
    return htmlCard;
  }

  //handling error for empty search box
  function displayError() {
    alert("search term can not be empty!");
  }
});

