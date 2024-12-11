
var body = document.querySelector("tbody");
var adminData = JSON.parse(localStorage.getItem("user"));
var orders ;
const {email,token} = adminData;

const getData = async() =>{
        let token = JSON.parse(localStorage.getItem("user")).token;
        let response = await fetch(`http://localhost:4000/admin/getOrders/${email}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        
        });
        let data = await response.json();
        orders = data.data;
        showOrders();
    }
getData();

const showOrders = () =>{
    body.innerHTML = ``;
    orders.forEach((item)=>{
        const{fname,orderid,orderitems,orderamount} = item;
        var tr = document.createElement('tr');
        tr.innerHTML = `<th scope="row">${fname}</th>
                        <td>${orderid}</td>
                        <td>${orderitems}</td>
                        <td>${orderamount}</td>
                        <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteEntry('${orderid}')">
                            <i class="fas fa-trash-alt"></i> Delete
                        </button>
                        </td>`
                        body.appendChild(tr);
    })
}

function deleteEntry(orderid) {
    if (confirm("Are you sure you want to delete this entry?")) {
        fetch(`http://localhost:4000/admin/deleteEntry/${email}`,{
            method: 'DELETE',
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({orderid,token})
            })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            if(data.success){
                getData();
                alert("Order deleted successfully.");
            }
            else{
                alert("Failed to delete order.");
            }
        })
    }
}