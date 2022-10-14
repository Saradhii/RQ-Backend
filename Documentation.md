## Intoglo Tech- Quote Form Api.

This API is created to get the form details of user/client such as Product Details, Delivery Way, Transportation Way, Starting and Ending Locations of Shipments to analyze and create a quotations based on the information.
This form will accept details like- 1. product_details, 2. delivery_type, 3. transportation_by, 4. weight, 5. volume, 6. byunits, 7. dimensions, 8. container_type, 9. containers_quantity, 10. location_from, 11. location_to, 12. ready_to_load, 13. additional_infromation, 14. associated_services, 15. first_name, 16. last_name, 17. phone, 18. email. 19. weight, 20. volume

    Depending upon the requirements of shipping using Units, the form will accept dimensions of product as well.


    ###End Points-

    1. To Send The Form Data-
       /requestquote/newrequest


    2. To Get All the Data Filled in for Quotations-
        /requestquote/getall

    3. To get the deatails of one user/client using Email-
        /requestquote/getone

// FCL
{
"product_details": {"name":"Shirts",
"discription":"Shirts, men's or boys' (not knitted or crocheted),Shirts, men's or boys' (not knitted or crocheted)",
"hscode":"6205.00.00.00",
"category":"Cotton",
"level":"IV"},
"delivery_type":"Sea",
"transportation_by":"FCL",
"container_type": "40' STANDARD",
"containers_quantity": 10,
"location_from": "Chennai,India",
"location_to": "San Francisco,USA",
"ready_to_load": "23/10/2022",
"associated_services": "Insurence",
"first_name":"Jhon",
"last_name":"Doe",
"phone":"306-171-237",
"email":"jhondoe@outlook.com"
}

// LCL

{
"product_details": {"name":"Shirts",
"discription":"Shirts, men's or boys' (not knitted or crocheted),Shirts, men's or boys' (not knitted or crocheted)",
"hscode":"6205.00.00.00",
"category":"Cotton",
"level":"IV"},
"delivery_type":"Sea",
"transportation_by":"LCL",
"weight":10,
"volume":27,
"location_from": "Chennai,India",
"location_to": "San Francisco,USA",
"ready_to_load": "23/10/2022",
"associated_services": "Insurence",
"first_name":"Jhon",
"last_name":"Doe",
"phone":"306-171-2378",
"email":"lcldoe@outlook.com"
}

// LCL By Units

{
"product_details": {"name":"Shirts",
"discription":"Shirts, men's or boys' (not knitted or crocheted),Shirts, men's or boys' (not knitted or crocheted)",
"hscode":"6205.00.00.00",
"category":"Cotton",
"level":"IV"},
"delivery_type":"Sea",
"transportation_by":"LCL",
"byunits":true,
"dimensions":[{"width":10,"height":10,"length":20, "quantity":10, "gross_weight":27},{"width":30,"height":15,"length":20, "quantity":10, "gross_weight":27} ],
"quantity":10,
"gross_weight":27,
"location_from": "Chennai,India",
"location_to": "San Francisco,USA",
"ready_to_load": "23/10/2022",
"associated_services": "Insurence",
"first_name":"Jhon",
"last_name":"Doe",
"phone":"306-171-837",
"email":"seadoe@outlook.com"
}

// Standard Cargo

{
"product_details": {"name":"Shirts",
"discription":"Shirts, men's or boys' (not knitted or crocheted),Shirts, men's or boys' (not knitted or crocheted)",
"hscode":"6205.00.00.00",
"category":"Cotton",
"level":"IV"},
"delivery_type":"Air",
"transportation_by":"SC",
"byunits":true,
"dimensions":[{"width":10,"height":10,"length":20, "quantity":10, "gross_weight":27},{"width":30,"height":15,"length":20, "quantity":10, "gross_weight":27} ],
"quantity":10,
"gross_weight":27,
"location_from": "Chennai,India",
"location_to": "San Francisco,USA",
"ready_to_load": "23/10/2022",
"associated_services": "Insurence",
"first_name":"Jhon",
"last_name":"Doe",
"phone":"306-171-537",
"email":"airdoe@outlook.com"
}
