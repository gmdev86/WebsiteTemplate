var indianaApp = (function(){
    let itemsPerPage = 5; // You can adjust this value
    let totalPages = 0;

    return {
        init: init,
        initContactPage: initContactPage
    }

    function initContactPage(){
        $('#email, #confirmEmail').on('input', function () {
            verifyEmailMatch();
        });

        $('#contactForm').submit(function (event) {
            // Prevent form submission if email fields don't match
            if ($('#email').val() !== $('#confirmEmail').val()) {
              event.preventDefault();
              alert('Email addresses do not match. Please verify.');
            } else {
                event.preventDefault();
                alert('Thank you!');
                $('#firstName').val('');
                $('#lastName').val('');
                $('#email').val('');
                $('#confirmEmail').val('');
                $('#question').val('');
                $('#confirmEmail').removeClass('is-invalid');
                $('#confirmEmail').removeClass('is-valid');
            }
        });
    }

    function init(){
        console.log('application starting');
        totalPages = Math.ceil(counties.length / itemsPerPage);
        setupEventListeners();
        loadCountyTable();
        $('#tablePager li:first-child a').click();
    }

    function setupEventListeners(){
        const paths = document.querySelectorAll('path');

        paths.forEach(path => {
            path.addEventListener('mouseover', handleMouseOver);
            path.addEventListener('mouseout', handleMouseOut);
            path.addEventListener('click', handlePathClick);
        });

        $('#countyModalCloseBtn').click(function () {
            $('#countyModal').modal('hide');
        });

        $('#tablePager').on('click', 'a', function (e) {
            $('#tablePager li').removeClass('active');
            e.preventDefault();
            $(this).parent('li').addClass('active');
            const selectedPage = parseInt($(this).text(), 10);
            showItems(selectedPage);
        });
    }

    function handlePathClick(event){
        let clickedPath = event.target;
        var county = searchCounty(clickedPath.id);
        $('#countyLabel').text(county.name);
        $('#countyName').val(county.name);
        $('#countyType').val(county.type);
        $('#countyFips').val(county.county_fips);
        $('#stateId').val(county.state_id);
        $('#stateName').val(county.state_name);
        $('#latitude').val(county.lat);
        $('#longitude').val(county.lng);
        $('#population').val(county.population);
        $('#countyModal').modal('show');
    }

    function handleMouseOver(event) {
        let hoveredPath = event.target;
        if(hoveredPath){
            hoveredPath.style.stroke = 'red';
            hoveredPath.style.strokeWidth  = '1';
            hoveredPath.style.filter = 'drop-shadow(8px 8px 8px rgba(0, 0, 0, 0.8))';
            hoveredPath.style.cursor = 'pointer';

            // Create a tooltip element
            var tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = hoveredPath.id;

            // Calculate tooltip position based on mouse coordinates
            var mouseX = event.pageX;
            var mouseY = event.pageY;

            // Set the tooltip position
            tooltip.style.position = 'absolute';
            tooltip.style.left = mouseX + 'px';
            tooltip.style.top = (mouseY - 30) + 'px'; // Adjust -20 for better positioning

            // Append the tooltip to the document
            document.body.appendChild(tooltip);
        }
    }

    function handleMouseOut(event) {
        let hoveredPath = event.target;
        if(hoveredPath){
            hoveredPath.style.fill = '';
            hoveredPath.style.stroke = '';
            hoveredPath.style.strokeWidth  = '1';
            hoveredPath.style.filter = 'none';
            hoveredPath.style.cursor = 'auto';

            var tooltip = document.querySelector('.custom-tooltip');
            if (tooltip) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }
    }

    function searchCounty(countyId) {
        return counties.find(county => county.id === countyId);
    }

    function showItems(page) {
        $('tbody tr').hide(); // Hide all rows

        if(page === 1){
            var items = $(`tbody tr`);
            $(items[0]).show();
            $(items[1]).show();
            $(items[2]).show();
            $(items[3]).show();
            $(items[4]).show();
        } else {
            const startIdx = (page - 1) * itemsPerPage;
            const endIdx = startIdx + itemsPerPage;
            $(`tbody tr:lt(${endIdx}):gt(${startIdx - 1})`).show();
        }
    }

    function loadCountyTable(){
        const tableBody = document.getElementById('countyTable').getElementsByTagName('tbody')[0];

        counties.forEach(county => {
            const row = tableBody.insertRow();
            Object.values(county).forEach(value => {
              const cell = row.insertCell();
              cell.textContent = value;
            });
          });
      
          // Hide the spinner and show the table when data is loaded
          $('#tableSpinner').addClass('d-none');
          $('#countyTable').removeClass('d-none');
          $('#tablePager').html(''); // Clear previous pagination
      
          for (let i = 1; i <= totalPages; i++) {
            $('#tablePager').append(`<li class="page-item"><a class="page-link" href="#">${i}</a></li>`);
          }
    }

    function verifyEmailMatch() {
        const email = $('#email').val();
        const confirmEmail = $('#confirmEmail').val();
  
        // Add/remove a class to indicate matching/non-matching
        if (email === confirmEmail) {
          $('#confirmEmail').removeClass('is-invalid').addClass('is-valid');
        } else {
          $('#confirmEmail').removeClass('is-valid').addClass('is-invalid');
        }
    }

})();

window.indianaApp = indianaApp;

let counties = 
[
    {
      "id": "Adams",
      "name": "Adams",
      "type": "County",
      "county_fips": "18001",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.7457",
      "lng": "-84.9366",
      "population": "35685"
    },
    {
      "id": "Allen",
      "name": "Allen",
      "type": "County",
      "county_fips": "18003",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.0909",
      "lng": "-85.0666",
      "population": "381839"
    },
    {
      "id": "Bartholomew",
      "name": "Bartholomew",
      "type": "County",
      "county_fips": "18005",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.206",
      "lng": "-85.8976",
      "population": "81759"
    },
    {
      "id": "Benton",
      "name": "Benton",
      "type": "County",
      "county_fips": "18007",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.6063",
      "lng": "-87.3109",
      "population": "8687"
    },
    {
      "id": "Blackford",
      "name": "Blackford",
      "type": "County",
      "county_fips": "18009",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.4736",
      "lng": "-85.3248",
      "population": "12139"
    },
    {
      "id": "Boone",
      "name": "Boone",
      "type": "County",
      "county_fips": "18011",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.0508",
      "lng": "-86.4687",
      "population": "69839"
    },
    {
      "id": "Brown",
      "name": "Brown",
      "type": "County",
      "county_fips": "18013",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.1962",
      "lng": "-86.2274",
      "population": "15444"
    },
    {
      "id": "Carroll",
      "name": "Carroll",
      "type": "County",
      "county_fips": "18015",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.5828",
      "lng": "-86.5635",
      "population": "20288"
    },
    {
      "id": "Cass",
      "name": "Cass",
      "type": "County",
      "county_fips": "18017",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.7615",
      "lng": "-86.346",
      "population": "37918"
    },
    {
      "id": "Clark",
      "name": "Clark",
      "type": "County",
      "county_fips": "18019",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.4772",
      "lng": "-85.7073",
      "population": "120185"
    },
    {
      "id": "Clay",
      "name": "Clay",
      "type": "County",
      "county_fips": "18021",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.3928",
      "lng": "-87.1158",
      "population": "26397"
    },
    {
      "id": "Clinton",
      "name": "Clinton",
      "type": "County",
      "county_fips": "18023",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.3017",
      "lng": "-86.4751",
      "population": "33010"
    },
    {
      "id": "Crawford",
      "name": "Crawford",
      "type": "County",
      "county_fips": "18025",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.2924",
      "lng": "-86.4517",
      "population": "10511"
    },
    {
      "id": "Daviess",
      "name": "Daviess",
      "type": "County",
      "county_fips": "18027",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.7024",
      "lng": "-87.072",
      "population": "33281"
    },
    {
      "id": "Dearborn",
      "name": "Dearborn",
      "type": "County",
      "county_fips": "18029",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.1452",
      "lng": "-84.9732",
      "population": "50494"
    },
    {
      "id": "Decatur",
      "name": "Decatur",
      "type": "County",
      "county_fips": "18031",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.307",
      "lng": "-85.5011",
      "population": "26466"
    },
    {
      "id": "DeKalb",
      "name": "DeKalb",
      "type": "County",
      "county_fips": "18033",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.3976",
      "lng": "-84.9991",
      "population": "43059"
    },
    {
      "id": "Delaware",
      "name": "Delaware",
      "type": "County",
      "county_fips": "18035",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.2275",
      "lng": "-85.3969",
      "population": "112480"
    },
    {
      "id": "Dubois",
      "name": "Dubois",
      "type": "County",
      "county_fips": "18037",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.3643",
      "lng": "-86.8798",
      "population": "43474"
    },
    {
      "id": "Elkhart",
      "name": "Elkhart",
      "type": "County",
      "county_fips": "18039",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.5974",
      "lng": "-85.8587",
      "population": "206314"
    },
    {
      "id": "Fayette",
      "name": "Fayette",
      "type": "County",
      "county_fips": "18041",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.64",
      "lng": "-85.1788",
      "population": "23393"
    },
    {
      "id": "Floyd",
      "name": "Floyd",
      "type": "County",
      "county_fips": "18043",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.3188",
      "lng": "-85.907",
      "population": "79594"
    },
    {
      "id": "Fountain",
      "name": "Fountain",
      "type": "County",
      "county_fips": "18045",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.1209",
      "lng": "-87.242",
      "population": "16422"
    },
    {
      "id": "Franklin",
      "name": "Franklin",
      "type": "County",
      "county_fips": "18047",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.4149",
      "lng": "-85.0602",
      "population": "22769"
    },
    {
      "id": "Fulton",
      "name": "Fulton",
      "type": "County",
      "county_fips": "18049",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.047",
      "lng": "-86.2635",
      "population": "20400"
    },
    {
      "id": "Gibson",
      "name": "Gibson",
      "type": "County",
      "county_fips": "18051",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.3119",
      "lng": "-87.5846",
      "population": "33017"
    },
    {
      "id": "Grant",
      "name": "Grant",
      "type": "County",
      "county_fips": "18053",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.5158",
      "lng": "-85.6547",
      "population": "66802"
    },
    {
      "id": "Greene",
      "name": "Greene",
      "type": "County",
      "county_fips": "18055",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.0363",
      "lng": "-86.9621",
      "population": "30924"
    },
    {
      "id": "Hamilton",
      "name": "Hamilton",
      "type": "County",
      "county_fips": "18057",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.0725",
      "lng": "-86.052",
      "population": "341616"
    },
    {
      "id": "Hancock",
      "name": "Hancock",
      "type": "County",
      "county_fips": "18059",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.8236",
      "lng": "-85.7733",
      "population": "78616"
    },
    {
      "id": "Harrison",
      "name": "Harrison",
      "type": "County",
      "county_fips": "18061",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.1951",
      "lng": "-86.1114",
      "population": "39516"
    },
    {
      "id": "Hendricks",
      "name": "Hendricks",
      "type": "County",
      "county_fips": "18063",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.7695",
      "lng": "-86.51",
      "population": "172100"
    },
    {
      "id": "Henry",
      "name": "Henry",
      "type": "County",
      "county_fips": "18065",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.9311",
      "lng": "-85.3964",
      "population": "48857"
    },
    {
      "id": "Howard",
      "name": "Howard",
      "type": "County",
      "county_fips": "18067",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.4836",
      "lng": "-86.117",
      "population": "83349"
    },
    {
      "id": "Huntington",
      "name": "Huntington",
      "type": "County",
      "county_fips": "18069",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.8292",
      "lng": "-85.4881",
      "population": "36572"
    },
    {
      "id": "Jackson",
      "name": "Jackson",
      "type": "County",
      "county_fips": "18071",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.9064",
      "lng": "-86.0375",
      "population": "45948"
    },
    {
      "id": "Jasper",
      "name": "Jasper",
      "type": "County",
      "county_fips": "18073",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.023",
      "lng": "-87.1161",
      "population": "33006"
    },
    {
      "id": "Jay",
      "name": "Jay",
      "type": "County",
      "county_fips": "18075",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.438",
      "lng": "-85.0057",
      "population": "20570"
    },
    {
      "id": "Jefferson",
      "name": "Jefferson",
      "type": "County",
      "county_fips": "18077",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.7858",
      "lng": "-85.4385",
      "population": "33000"
    },
    {
      "id": "Jennings",
      "name": "Jennings",
      "type": "County",
      "county_fips": "18079",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.9969",
      "lng": "-85.628",
      "population": "27619"
    },
    {
      "id": "Johnson",
      "name": "Johnson",
      "type": "County",
      "county_fips": "18081",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.49",
      "lng": "-86.1016",
      "population": "159739"
    },
    {
      "id": "Knox",
      "name": "Knox",
      "type": "County",
      "county_fips": "18083",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.6891",
      "lng": "-87.418",
      "population": "36362"
    },
    {
      "id": "Kosciusko",
      "name": "Kosciusko",
      "type": "County",
      "county_fips": "18085",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.2441",
      "lng": "-85.8607",
      "population": "80151"
    },
    {
      "id": "LaGrange",
      "name": "LaGrange",
      "type": "County",
      "county_fips": "18087",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.6426",
      "lng": "-85.4265",
      "population": "40085"
    },
    {
      "id": "Lake",
      "name": "Lake",
      "type": "County",
      "county_fips": "18089",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.4167",
      "lng": "-87.3821",
      "population": "495925"
    },
    {
      "id": "LaPorte",
      "name": "LaPorte",
      "type": "County",
      "county_fips": "18091",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.546",
      "lng": "-86.74",
      "population": "112184"
    },
    {
      "id": "Lawrence",
      "name": "Lawrence",
      "type": "County",
      "county_fips": "18093",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.8412",
      "lng": "-86.4835",
      "population": "45133"
    },
    {
      "id": "Madison",
      "name": "Madison",
      "type": "County",
      "county_fips": "18095",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.1616",
      "lng": "-85.7194",
      "population": "130037"
    },
    {
      "id": "Marion",
      "name": "Marion",
      "type": "County",
      "county_fips": "18097",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.7817",
      "lng": "-86.1385",
      "population": "969542"
    },
    {
      "id": "Marshall",
      "name": "Marshall",
      "type": "County",
      "county_fips": "18099",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.3248",
      "lng": "-86.2618",
      "population": "46175"
    },
    {
      "id": "Martin",
      "name": "Martin",
      "type": "County",
      "county_fips": "18101",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.708",
      "lng": "-86.8031",
      "population": "9885"
    },
    {
      "id": "Miami",
      "name": "Miami",
      "type": "County",
      "county_fips": "18103",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.7695",
      "lng": "-86.045",
      "population": "36100"
    },
    {
      "id": "Monroe",
      "name": "Monroe",
      "type": "County",
      "county_fips": "18105",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.1609",
      "lng": "-86.5231",
      "population": "140189"
    },
    {
      "id": "Montgomery",
      "name": "Montgomery",
      "type": "County",
      "county_fips": "18107",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.0404",
      "lng": "-86.8933",
      "population": "37967"
    },
    {
      "id": "Morgan",
      "name": "Morgan",
      "type": "County",
      "county_fips": "18109",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.4816",
      "lng": "-86.4462",
      "population": "71394"
    },
    {
      "id": "Newton",
      "name": "Newton",
      "type": "County",
      "county_fips": "18111",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.9558",
      "lng": "-87.3976",
      "population": "13865"
    },
    {
      "id": "Noble",
      "name": "Noble",
      "type": "County",
      "county_fips": "18113",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.3986",
      "lng": "-85.4175",
      "population": "47293"
    },
    {
      "id": "Ohio",
      "name": "Ohio",
      "type": "County",
      "county_fips": "18115",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.9501",
      "lng": "-84.9652",
      "population": "5931"
    },
    {
      "id": "Orange",
      "name": "Orange",
      "type": "County",
      "county_fips": "18117",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.5418",
      "lng": "-86.495",
      "population": "19752"
    },
    {
      "id": "Owen",
      "name": "Owen",
      "type": "County",
      "county_fips": "18119",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.3128",
      "lng": "-86.8377",
      "population": "21280"
    },
    {
      "id": "Parke",
      "name": "Parke",
      "type": "County",
      "county_fips": "18121",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.7736",
      "lng": "-87.2064",
      "population": "16316"
    },
    {
      "id": "Perry",
      "name": "Perry",
      "type": "County",
      "county_fips": "18123",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.0796",
      "lng": "-86.638",
      "population": "19151"
    },
    {
      "id": "Pike",
      "name": "Pike",
      "type": "County",
      "county_fips": "18125",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.3988",
      "lng": "-87.2322",
      "population": "12220"
    },
    {
      "id": "Porter",
      "name": "Porter",
      "type": "County",
      "county_fips": "18127",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.4603",
      "lng": "-87.0672",
      "population": "172353"
    },
    {
      "id": "Posey",
      "name": "Posey",
      "type": "County",
      "county_fips": "18129",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.0218",
      "lng": "-87.8685",
      "population": "25301"
    },
    {
      "id": "Pulaski",
      "name": "Pulaski",
      "type": "County",
      "county_fips": "18131",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.0419",
      "lng": "-86.6988",
      "population": "12496"
    },
    {
      "id": "Putnam",
      "name": "Putnam",
      "type": "County",
      "county_fips": "18133",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.6663",
      "lng": "-86.845",
      "population": "36838"
    },
    {
      "id": "Randolph",
      "name": "Randolph",
      "type": "County",
      "county_fips": "18135",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.1576",
      "lng": "-85.0114",
      "population": "24681"
    },
    {
      "id": "Ripley",
      "name": "Ripley",
      "type": "County",
      "county_fips": "18137",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.1035",
      "lng": "-85.2624",
      "population": "28953"
    },
    {
      "id": "Rush",
      "name": "Rush",
      "type": "County",
      "county_fips": "18139",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.62",
      "lng": "-85.4658",
      "population": "16706"
    },
    {
      "id": "Scott",
      "name": "Scott",
      "type": "County",
      "county_fips": "18143",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.6851",
      "lng": "-85.7475",
      "population": "24290"
    },
    {
      "id": "Shelby",
      "name": "Shelby",
      "type": "County",
      "county_fips": "18145",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.5237",
      "lng": "-85.7917",
      "population": "44825"
    },
    {
      "id": "Spencer",
      "name": "Spencer",
      "type": "County",
      "county_fips": "18147",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.0141",
      "lng": "-87.0077",
      "population": "19949"
    },
    {
      "id": "St. Joseph",
      "name": "St. Joseph",
      "type": "County",
      "county_fips": "18141",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.6167",
      "lng": "-86.2899",
      "population": "272049"
    },
    {
      "id": "Starke",
      "name": "Starke",
      "type": "County",
      "county_fips": "18149",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.2809",
      "lng": "-86.6476",
      "population": "23275"
    },
    {
      "id": "Steuben",
      "name": "Steuben",
      "type": "County",
      "county_fips": "18151",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.6439",
      "lng": "-85.0009",
      "population": "34379"
    },
    {
      "id": "Sullivan",
      "name": "Sullivan",
      "type": "County",
      "county_fips": "18153",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.0888",
      "lng": "-87.4147",
      "population": "20814"
    },
    {
      "id": "Switzerland",
      "name": "Switzerland",
      "type": "County",
      "county_fips": "18155",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.8262",
      "lng": "-85.0369",
      "population": "9870"
    },
    {
      "id": "Tippecanoe",
      "name": "Tippecanoe",
      "type": "County",
      "county_fips": "18157",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.3886",
      "lng": "-86.8941",
      "population": "185961"
    },
    {
      "id": "Tipton",
      "name": "Tipton",
      "type": "County",
      "county_fips": "18159",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.3113",
      "lng": "-86.0519",
      "population": "15290"
    },
    {
      "id": "Union",
      "name": "Union",
      "type": "County",
      "county_fips": "18161",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.6256",
      "lng": "-84.9251",
      "population": "7098"
    },
    {
      "id": "Vanderburgh",
      "name": "Vanderburgh",
      "type": "County",
      "county_fips": "18163",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.0249",
      "lng": "-87.5859",
      "population": "179695"
    },
    {
      "id": "Vermillion",
      "name": "Vermillion",
      "type": "County",
      "county_fips": "18165",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.8538",
      "lng": "-87.464",
      "population": "15477"
    },
    {
      "id": "Vigo",
      "name": "Vigo",
      "type": "County",
      "county_fips": "18167",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.4306",
      "lng": "-87.39",
      "population": "106523"
    },
    {
      "id": "Wabash",
      "name": "Wabash",
      "type": "County",
      "county_fips": "18169",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.8456",
      "lng": "-85.794",
      "population": "31120"
    },
    {
      "id": "Warren",
      "name": "Warren",
      "type": "County",
      "county_fips": "18171",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.3469",
      "lng": "-87.3533",
      "population": "8430"
    },
    {
      "id": "Warrick",
      "name": "Warrick",
      "type": "County",
      "county_fips": "18173",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.0922",
      "lng": "-87.2721",
      "population": "63575"
    },
    {
      "id": "Washington",
      "name": "Washington",
      "type": "County",
      "county_fips": "18175",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "38.6",
      "lng": "-86.1053",
      "population": "28025"
    },
    {
      "id": "Wayne",
      "name": "Wayne",
      "type": "County",
      "county_fips": "18177",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "39.8644",
      "lng": "-85.0098",
      "population": "66588"
    },
    {
      "id": "Wells",
      "name": "Wells",
      "type": "County",
      "county_fips": "18179",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.7292",
      "lng": "-85.2212",
      "population": "28103"
    },
    {
      "id": "White",
      "name": "White",
      "type": "County",
      "county_fips": "18181",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "40.7498",
      "lng": "-86.8655",
      "population": "24593"
    },
    {
      "id": "Whitley",
      "name": "Whitley",
      "type": "County",
      "county_fips": "18183",
      "state_id": "IN",
      "state_name": "Indiana",
      "lat": "41.1394",
      "lng": "-85.5051",
      "population": "34048"
    }
  ];