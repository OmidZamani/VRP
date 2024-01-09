var vehiclePoints = [
  [
    {
      lat: 35.70240463304435,
      lng: 51.33774662070209
    },
    {
      lat: 35.7071301230183,
      lng: 51.35095596313477
    },
    {
      lat: 35.710719358131,
      lng: 51.33657932281495
    },
    {
      lat: 35.707360117900016,
      lng: 51.330914497375495
    },
    {
      lat: 35.70240463304435,
      lng: 51.33774662070209
    },
  ],
  [
    {
      lat: 35.70240463304435,
      lng: 51.33774662070209
    },
    {
      lat: 35.69247879305095,
      lng: 51.341960903446314
    },
    {
      lat: 35.70240463304435,
      lng: 51.33774662070209
    },
  ],
  [
    {
      lat: 35.70240463304435,
      lng: 51.33774662070209
    },
    {
      lat: 35.70211189392619,
      lng: 51.31912994358572
    },
    {
      lat: 35.70240463304435,
      lng: 51.33774662070209
    },
  ],
  [
    {
      lat: 35.70240463304435,
      lng: 51.33774662070209
    },
    {
      lat: 35.72343719476078,
      lng: 51.302032468083794
    },
    {
      lat: 35.70240463304435,
      lng: 51.33774662070209
    },
  ]
]
var salesmanPoints = [
  {
    lat: 35.70240463304435,
    lng: 51.33774662070209
  },
  {
    lat: 35.7071301230183,
    lng: 51.35095596313477
  },
  {
    lat: 35.710719358131,
    lng: 51.33657932281495
  },
  {
    lat: 35.707360117900016,
    lng: 51.330914497375495
  },
]
var _salesmanPoints = [
  {
    lat: 35.70240463304435,
    lng: 51.33774662070209
  },
  {
    lat: 35.7071301230183,
    lng: 51.35095596313477
  },
  {
    lat: 35.710719358131,
    lng: 51.33657932281495
  },
  {
    lat: 35.707360117900016,
    lng: 51.330914497375495
  },

  {
    lat: 35.70240463304435,
    lng: 51.33774662070209
  },
]

var colors = [
  '#333333',
  '#1f1bfc',
  '#1cff1c',
  '#fc8a19',
  '#DC143C',
  '#FF1493',
  '#C71585',
  '#FF4500',
  '#FFA500',
  '#BDB76B',
  '#696969',
  '#483D8B',
  '#32CD32',
  '#3CB371',
  '#2F4F4F',
  '#008B8B',
  '#48D1CC',
  '#4682B4',
  '#006400',
  '#0A4D68',
  '#F6BA6F',
  '#917FB3',
  '#FF6D60',
  '#569DAA',
  '#41644A',
  '#FF6000',
  '#2F0F5D',
  '#4F200D',
  '#B3005E',
  '#820000',
]
var apiKey = 'p195d35165ad71470ebb52146557ee16229fe818ac'
var parsiMapKey = 'p1a17b4952e44846b5a486861f1f7c9153c49fdb24'
var parsiMapTokenService = 'p1c9f614aca0364596a8d3bfbdd24552b3cc465c5f'
var neshanKey = 'web.d311dafd01ac4f50822849fb047fb745'

var count = 0
var time = 180000
var timOUT
var present = 0


var addMarker = []

var vehicleRoute = []
var vehicleRoute1 = []
var vehiclePolygon = []

var markers = [];
var markers1 = [];
var listMarker = []
var listMarker1 = []

var duration_matrix = null
var distance_matrix = null
var vehicles_matrix = null
//
// var duration_matrix_list = null
// var distance_matrix_list = null
