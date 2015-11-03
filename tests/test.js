(function () {
    'use strict';

    /* global test,equal,module,start,stop,window,$,ok,expect */


    /*---------------------------------*/
    /*     PART ONE: SIMPLE MODULE     */
    /*---------------------------------*/
    module('SpeedCheck Module', {
        beforeEach: function() {

        }
    });

    // TODO: Vérifier que la création d'objets SpeedCheck est Possible
    test('Test objects creating', function() {
      notEqual(createSpeedCheck(), null, 'Base constructor OKI');
      notEqual(createSpeedCheckFR(), null, 'Base constructor FR OKI');
      notEqual(createSpeedCheckBE(), null, 'Base constructor BE OKI');
    });
	

    // TODO: Vérifier que les objets créés directement avec creatSpeedCheck ne sont pas utilisables :
    test('Test base object editing', function() {
      var mySpeed = createSpeedCheck();
      throws(function() { mySpeed.speed = 42; }, "Speed editing - SHOULD throw a SpeedCheckError");
      throws(function() { mySpeed.licencePlate = '3-DFE-456'; }, "Licence plate editing - SHOULD throw a SpeedCheckError");

    });


    // TODO: Vérifier que TOUTES les fonctionnalités de createSpeedCheckFR sont correctes (effects de bords, valeurs négatives, etc.) pour tous les attributs (speed et licencePlate)
    test('SpeedCheck FR', function() {
      var mySpeed = createSpeedCheckFR();
      equal(mySpeed.speed, 0, "Base speed OKI");
      mySpeed.speed = 42;
      equal(mySpeed.speed, 42, "Modified speed OKI");
      throws(function() { mySpeed.speed = -42; }, "Invalid speed - negative - SHOULD throw a SpeedCheckError");
      equal(mySpeed.speed, 42, "Last good speed OKI");
      equal(mySpeed.infraction, false, "No infraction OKI (42km/h)");
      mySpeed.speed = 0;
      equal(mySpeed.infraction, false, "No infraction OKI (0km/h)");
      mySpeed.speed = 131;
      equal(mySpeed.infraction, true, "Infraction OKI (131km/h)");
      equal(mySpeed.licencePlate, "???", "Base licence plate");
      mySpeed.licencePlate = "BM-108-QE";
      equal(mySpeed.licencePlate, "BM-108-QE", "BM-108-QE licence plate");
      throws(function() { mySpeed.licencePlate = "123456"; }, "Invalid licence plate - 123456 - SHOULD throw a SpeedCheckError");
      equal(mySpeed.licencePlate, "BM-108-QE", "Last good licence plate");
      mySpeed.licencePlate = "BM108QE";
      equal(mySpeed.licencePlate, "BM108QE", "BM108QE licence plate without -");
      throws(function() { mySpeed.licencePlate = "123456"; }, "Invalid licence plate - 123456 - SHOULD throw a SpeedCheckError");
      equal(mySpeed.licencePlate, "BM108QE", "Last good licence plate without -");
      throws(function() { mySpeed.licencePlate = "B108QE"; }, "Invalid licence plate - B108QE - SHOULD throw a SpeedCheckError");
      throws(function() { mySpeed.licencePlate = "BM08QE"; }, "Invalid licence plate - BM08QE - SHOULD throw a SpeedCheckError");
      throws(function() { mySpeed.licencePlate = "BM108Q"; }, "Invalid licence plate - BM108Q - SHOULD throw a SpeedCheckError");
    });

    // TODO: Vérifier que TOUTES les fonctionnalités de createSpeedCheckBE sont correctes (effects de bords, valeurs négatives, etc.) pour tous les attributs (speed et licencePlate)
    test('SpeedCheck BE', function() {
      var mySpeed = createSpeedCheckBE();
      equal(mySpeed.speed, 0, "Base speed OKI");
      mySpeed.speed = 42;
      equal(mySpeed.speed, 42, "Modified speed OKI");
      throws(function() { mySpeed.speed = -42; }, "Invalid speed - negative - SHOULD throw a SpeedCheckError");
      equal(mySpeed.speed, 42, "Last good speed OKI");
      equal(mySpeed.infraction, false, "No infraction OKI (42km/h)");
      mySpeed.speed = 0;
      equal(mySpeed.infraction, false, "No infraction OKI (0km/h)");
      mySpeed.speed = 121;
      equal(mySpeed.infraction, true, "Infraction OKI (121km/h)");
      equal(mySpeed.licencePlate, "???", "Base licence plate");
      mySpeed.licencePlate = "1-ABC-123";
      equal(mySpeed.licencePlate, "1-ABC-123", "1-ABC-123 licence plate");
      throws(function() { mySpeed.licencePlate = "123456"; }, "Invalid licence plate - 123456 - SHOULD throw a SpeedCheckError");
      equal(mySpeed.licencePlate, "1-ABC-123", "Last good licence plate");
      throws(function() { mySpeed.licencePlate = "-ABC-123"; }, "Invalid licence plate - -ABC-123 - SHOULD throw a SpeedCheckError");
      throws(function() { mySpeed.licencePlate = "1-AC-123"; }, "Invalid licence plate - 1-AC-123 - SHOULD throw a SpeedCheckError");
      throws(function() { mySpeed.licencePlate = "1-ABC-23"; }, "Invalid licence plate - 1-ABC-23 - SHOULD throw a SpeedCheckError");
    });

    // TODO: Vérifier que la fonction toString() fonctionne bien.
    //  - chaine de caractère attentue pour une infracion (e.g. licencePlate === 'WD366MD' et  speed === 135):
    //      "Véhicule WD366MD roule à 135 km/h. Infraction!"
    //  - chaine de caractère attendue pour sans infraction (e.g. licencePlate === 'WD366MD' et  speed === 105):
    //      "Véhicule WD366MD roule à 105 km/h. Ça va, circulez..."
    test('toString SpeedCheck', function() {
      var mySpeed = createSpeedCheckFR();
      mySpeed.speed = 135;
      mySpeed.licencePlate = "WD366MD";
      equal(mySpeed.toString(), "Véhicule WD366MD roule à 135 km/h. Infraction!", "FR : toString OKI (Véhicule WD366MD roule à 135 km/h. Infraction!)");
      mySpeed.speed = 105;
      equal(mySpeed.toString(), "Véhicule WD366MD roule à 105 km/h. Ça va, circulez...", "FR : toString OKI (Véhicule WD366MD roule à 105 km/h. Ça va, circulez...)");
      mySpeed = createSpeedCheckBE();
      mySpeed.speed = 121;
      mySpeed.licencePlate = "1-ABC-123";
      equal(mySpeed.toString(), "Véhicule 1-ABC-123 roule à 121 km/h. Infraction!", "BE : toString OKI (Véhicule 1-ABC-123 roule à 121 km/h. Infraction!)");
      mySpeed.speed = 101;
      equal(mySpeed.toString(), "Véhicule 1-ABC-123 roule à 101 km/h. Ça va, circulez...", "BE : toString OKI (Véhicule 1-ABC-123 roule à 101 km/h. Ça va, circulez...)");
    });



    /*---------------------------------*/
    /*  PART TWO: The "Shapes" module  */
    /*---------------------------------*/
    var roadAttr, amenityAttr, buildingAttr, naturalAttr;
    module('Unit Testing The "Shapes" Module', {
      beforeEach: function(){
        roadAttr = JSON.parse('{ \
          "building": false, \
          "highway": "residential", \
          "_id": "-629863", \
          "nodes": [{ \
              "y": 369.0, \
              "x": 708.0 \
          }, { \
              "y": 396.0, \
              "x": 743.0 \
          }], \
          "name": "Rue de Colmar" \
          } \
        ');

        amenityAttr = JSON.parse('{\
        "_id":"-629724",\
        "nodes":[{"y":32.0,\
        "x":629.0},\
        {"y":42.0,\
        "x":597.0},\
        {"y":43.0,\
        "x":595.0},\
        {"y":32.0,\
        "x":629.0}],\
        "amenity":"parking"}');

        buildingAttr = JSON.parse('{"building":true,\
        "_id":"-629719",\
        "nodes":[{"y":0.0,\
        "x":0.0},\
        {"y":0.0,\
        "x":100.0},\
        {"y":100.0,\
        "x":100.0},\
        {"y":100.0,\
        "x":0.0},\
        {"y":0.0,\
        "x":0.0}]}');

        naturalAttr = JSON.parse('{"building":false,\
        "_id":"-630043",\
        "nodes":[{"y":309.0,\
        "x":222.0},\
        {"y":324.0,\
        "x":262.0},\
        {"y":335.0,\
        "x":231.0},\
        {"y":309.0,\
        "x":222.0}],\
        "name":"Bassin Paul Vatine",\
        "natural":"water"}');

      }
    });


    test('Test Shapes\' VERSION Property', function() {
        expect(1);
        equal(window.Shapes.VERSION, '0.0.1', 'The Shapes module should have a VERSION property');
    });

    test('Test Creation of a Default Object', function() {
      expect(2);
      ok(typeof window.Shapes.createShape !== 'undefined', 'The Shapes module sould expose a "createShape" function');
      var shape0 = window.Shapes.createShape(roadAttr);
      ok(typeof shape0 === 'object', 'The "createShape" function should return objects.');
    });

    test('Test proper hidding of properties', function() {
      expect(4);
      var shape0 = window.Shapes.createShape(roadAttr);
      var prop;
      var props = [];
      for(prop in shape0){
        if(shape0.hasOwnProperty(prop)){
          props.push(prop);
        }
      }
      // Only 3 properties SHOULD be  visible
      //{ id: [Function], toString: [Function], toSVGPath: [Function] }
      equal(props.length, 3, 'Only 3 properties SHOULD be  visible in objects created by "createShape"');
      for(prop in props){
        ok(prop === 'id' || prop === 'toString' || prop === 'toSVGString', 'One of "id" "toString" or "toSVGString"');
      }
    });


    test('Test the toSVGString method', function() {
      expect(1);
      var shape0 = window.Shapes.createShape(roadAttr);
      equal(shape0.toSVGString(), 'M 708.0 369.0 L 743.0 396.0', 'Should create a valid SVG PATH (google SVG PATH for details)');
    });

    test('Test the name accessor', function() {
      expect(1);
      var shape0 = window.Shapes.createShape(roadAttr);
      equal(shape0.getName(), 'Rue de Colmar', 'Should return the value corresponding to the "name" property in the attributes');
    });


    test('Test the createRoad function', function() {
      expect(1);
      ok(typeof window.Shapes.createRoad !== 'undefined', 'The Shapes module sould expose a "createRoad" function');
    });

    test('Test objects created with the createRoad function', function() {
      expect(2);
      var road = window.Shapes.createRoad(roadAttr);
      ok(typeof road.getCaterogy === 'function', 'Object Created with "createRoad" Should have a getCategory function');
      equal(road.getCaterogy(),'Residential', 'Should return the value corresponding to the "highway" property in the attributes');
    });

    test('Test the createAmenity function', function() {
      expect(1);
      ok(typeof window.Shapes.createAmenity !== 'undefined', 'The Shapes module sould expose a "createAmenity" function');
    });
    test('Test objects created with the  createAmenity function', function() {
      expect(2);
      var amenity = window.Shapes.createAmenity(amenityAttr);
      ok(typeof amenity.getType === 'function', 'Object Created with "createAmenity" Should have a getType function');
      equal(amenity.getType(),'parking', 'Should return the value corresponding to the "amenity" property in the attributes');
    });

    test('Test the createBuilding function', function() {
      expect(1);
      ok(typeof window.Shapes.createBuilding !== 'undefined', 'The Shapes module sould expose a "createBuilding" function');
    });

    test('Test objects created with the  createBuilding function', function() {
      expect(3);
      var building = window.Shapes.createBuilding(buildingAttr);
      ok(typeof building.getArea === 'function', 'Object Created with "createBuilding" Should have a getArea function');
      equal(building.getArea(),10000, 'Should return the area of the building computed from the set of points in the nodes attributes');
    });


    test('Test the createAmenity function', function() {
      expect(1);
      ok(typeof window.Shapes.createNatural !== 'undefined', 'The Shapes module sould expose a "createNatural" function');
    });
    test('Test objects created with the  createNatural function', function() {
      expect(2);
      var natural = window.Shapes.createNatural(naturalAttr);
      ok(typeof natural.getType === 'function', 'Object Created with "createNatural" Should have a getType function');
      equal(natural.getType(),'water', 'Should return the value corresponding to the "natural" property in the attributes');
    });





    /*-----------------------------------*/
    /* PART THREE: Test with a JSON file */
    /*-----------------------------------*/

    // TODO Write the whole test module for testing with the app/data/eure.json file.

    var mObjEure = [];
    var mJsonContent = {buildings: [], naturals: [], highways: [], amenities: []};
    var mUnused = 0;
    var mOverallSurface = 0
    var mAverageSurface = 0.0;
    
    module('Asynchronous Unit Test Module', {
        beforeEach: function() {
            stop();

            // You can load a resource before loaching the test...
            $.get('eure.json').success(function(data){
                myObjEure = data;
                myJsonContent = {buildings: [], naturals: [], highways: [], amenities: []};
                myUnused = 0;
                for (var cpt = 0; cpt < myObjEure.length; cpt++) {
                  var tmpObject = myObjEure[cpt];

                  if (tmpObject.hasOwnProperty("building") && tmpObject.building)
                    myJsonContent.buildings.push(window.Shapes.createBuilding(tmpObject));
                  else {
                    if (tmpObject.hasOwnProperty("natural"))
                      myJsonContent.naturals.push(window.Shapes.createNatural(tmpObject));
                    else if (tmpObject.hasOwnProperty("highway"))
                      myJsonContent.highways.push(window.Shapes.createRoad(tmpObject));
                    else if (tmpObject.hasOwnProperty("amenity"))
                      myJsonContent.amenities.push(window.Shapes.createAmenity(tmpObject));
                    else
                      myUnused++;
                  }
                }

                for(var cpt = 0; cpt < myJsonContent.buildings.length; cpt++)
                  myOverallSurface += myJsonContent.buildings[cpt].getArea();
                myAverageSurface = myOverallSurface / myJsonContent.buildings.length;

                start();
            });
        }
    });

    test('All objects are readed', function () {
      expect(1);
      equal(myObjEure.length, myJsonContent.buildings.length + myJsonContent.amenities.length + myJsonContent.highways.length + myJsonContent.naturals.length + myUnused, "Some objects are missing when reading !");
    });

    test('Buildings surfaces', function () {
      expect(3);
      var mySmallestSurface = myJsonContent.buildings[0].getArea();
      var myBiggestSurface = myJsonContent.buildings[0].getArea();

      var myAllBuildingsSurfacePositive = true;
      for(var cpt = 1; cpt < myJsonContent.buildings.length; cpt++)
      {
        if(myJsonContent.buildings[cpt].getArea() < 0)
          myAllBuildingsSurfacePositive = false;
        if(mySmallestSurface > myJsonContent.buildings[cpt].getArea())
          mySmallestSurface = myJsonContent.buildings[cpt].getArea();
        if(myBiggestSurface < myJsonContent.buildings[cpt].getArea())
          myBiggestSurface = myJsonContent.buildings[cpt].getArea();
      }
      equal(Math.min(mySmallestSurface, myAverageSurface), mySmallestSurface, "The average surface isn't smaller that the smallest");
      equal(Math.max(myBiggestSurface, myAverageSurface), myBiggestSurface, "The average surface isn't bigger that the biggest");
      equal(myAllBuildingsSurfacePositive, true, "All surfaces are positive");
    });
}());
