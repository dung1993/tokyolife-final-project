// import React, { useState, useRef, useEffect, Component } from "react";
// import { Container, Row, Col } from "reactstrap";
// import "../component/Style/report.css";
// import { Chart } from "react-google-charts";
// import { elements } from "chart.js";
// const Report = () => {
//     const [data,setData] = useState([])
//     useEffect(()=>{
//         if(products){
//             const newData = products.map((item)=>[item.title,item.count])
//             setData(newData)
//         }
//     },[])
//   // Dữ liệu biểu đồ
// //   const data = [
    
// //     ["Work", 11],
// //     ["Eat", 2],
// //     ["Commute", 2],
// //     ["Watch TV", 2],
// //     ["Sleep", 7],
// //   ];

//   // Cấu hình biểu đồ
//   const options = {
//     title: "TOP 5 BÁN CHẠY",
//   };

//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     fetch("http://localhost:8086/api/report/bestSeller").then(async (data) => {
//       let products = await data.json();
//       setProducts(products);
//     });
//   });
//   return (
//     <>
//       <div class="app-title">
//         <div class="app-title-child">
//           <h3> Thống kê </h3>
//         </div>
//         <div id="clock"></div>
//       </div>
//       <div class="cards">
//         <div class="row">
//           <div class="col-md-12">
//             <div class="be-content">
//               <div class="main-content container-fluid">
//                 <div class="row mt-3 mb-3">
//                   <div class="col-12 col-lg-4 ">
//                     <div class="widget widget-tile">
//                       <div class="chart sparkline" id="spark11"></div>
//                       <div class="data-info d-flex">
//                         <div class="desc">
//                           Tổng số nhân viên:{" "}
//                           <span class="number">
//                             <a href="/staffs" id="countStaff">
//                               0
//                             </a>
//                           </span>{" "}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div class="col-12 col-lg-4 ">
//                     <div class="widget widget-tile">
//                       <div class="chart sparkline" id="spark33"></div>
//                       <div class="data-info">
//                         <div class="desc">
//                           Tổng số sản phẩm:{" "}
//                           <span class="number">
//                             {" "}
//                             <a href="/products" id="countProduct">
//                               0
//                             </a>
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div class="row mt-3 mb-3">
//                   <div class="col-12 mb-3 d-flex">
//                     <span class="form-text my-auto title-table">
//                       {" "}
//                       Chọn ngày để xem doanh thu:
//                     </span>
//                     <input
//                       type="date"
//                       class="form-control ml-4 w-25"
//                       id="dateCount"
//                     />
//                   </div>
//                   <div class="col-12 col-lg-6 ">
//                     <div class="widget widget-tile">
//                       <div class="chart sparkline" id="spark1"></div>
//                       <div class="data-info d-flex">
//                         <div class="desc" id="day-amount-title">
//                           Doanh thu trong ngày:
//                           <span id="totalOfDay" class="number">
//                             0
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div class="col-12 col-lg-6 ">
//                     <div class="widget widget-tile">
//                       <div class="chart sparkline" id="spark2"></div>
//                       <div class="data-info d-flex">
//                         <div class="desc" id="day-bill-title">
//                           Hóa đơn trong ngày:{" "}
//                           <span id="countOrderCurrentDay" class="number">
//                             0
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div class="row">
//                   <div class="col-12 mb-3 d-flex">
//                     <span class="form-text my-auto title-table">
//                       {" "}
//                       Chọn tháng để xem doanh thu:
//                     </span>
//                     <input
//                       type="month"
//                       class="form-control ml-4 w-25"
//                       id="monthCount"
//                     />
//                   </div>
//                   <div class="col-12 col-lg-6 ">
//                     <div class="widget widget-tile">
//                       <div class="chart sparkline" id="spark3"></div>
//                       <div class="data-info d-flex">
//                         <div class="desc" id="month-amount-title">
//                           Doanh thu trong tháng:{" "}
//                           <span id="reportCurrentMonth" class="number">
//                             0
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div class="col-12 col-lg-6 ">
//                     <div class="widget widget-tile">
//                       <div class="chart sparkline" id="spark4"></div>
//                       <div class="data-info d-flex">
//                         <div class="desc" id="month-bill-title">
//                           Hóa đơn trong tháng:{" "}
//                           <span id="countBillOfMonth" class="number">
//                             0
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div class="row mt-3">
//                   <div class="col-6 col-lg-6 col-md-12">
//                     <div class="card">
//                       <div class="card-header">
//                         <div class="row d-flex justify-content-between">
//                           <div class="ml-3 title-table" id="title-top-5">
//                             TOP 5 BÁN CHẠY THÁNG 4
//                           </div>
//                         </div>
//                         <div class="d-flex justify-content-center" id="top5">
//                           <input
//                             type="month"
//                             id="month-top-5"
//                             class="form-control top5"
//                           />
//                           <select
//                             class="form-control ml-2 top5"
//                             id="sort-top-5"
//                           >
//                             <option value="DESC">Top 5 bán chạy</option>
//                             <option value="ASC">Top 5 bán ế</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div class="card-body">
//                         <table
//                           id="tbTop5Product"
//                           class="table table-striped table-hover w-100"
//                         >
//                           <thead>
//                             <tr>
//                               <th class="col ">#</th>
//                               <th class="col ">
//                                 <div className="d-flex justify-content-center">
//                                   Ảnh
//                                 </div>
//                               </th>
//                               <th class="col ">
//                                 <div className="d-flex justify-content-center">
//                                   Tên sản phẩm
//                                 </div>
//                               </th>
//                               <th class="col ">
//                                 <div className="d-flex justify-content-center">
//                                   Số lượng bán ra
//                                 </div>
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {products?.map((item, index) => (
//                               <tr>
//                                 <th scope="row">{index + 1}</th>
//                                 <td class="text-center">
//                                   <img src={item.fileUrl} alt="Ảnh sp" />
//                                 </td>
//                                 <td class="text-center">{item.title}</td>
//                                 <td class="text-center">{item.count}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                   <div class="col-6 col-lg-6 col-md-12">
//                     <div
//                       id="top10ProductChart"
//                       className="col-lg-12"
//                     >
//                       <Chart
//                         chartType="PieChart"
//                         data={[['Title', 'Quantity'], ...data]}
//                         options={options}
//                       />
//                     </div>
//                   </div>

//                   <div class="col-12 col-lg-12">
//                     <div class="card">
//                       <div class="card-header">
//                         <div class="row d-flex justify-content-between">
//                           <div class="ml-3 title-table">
//                             DOANH THU 6 THÁNG GẦN ĐÂY
//                           </div>
//                         </div>
//                       </div>
//                       <div class="card-body">
//                         <div
//                           id="report-6-month-ago"
//                           style={{ width: "100%", maxWidth: "1000px" }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>

//                   <div class="col-12 col-lg-12">
//                     <div class="card">
//                       <div class="card-header">
//                         <div class=" d-flex justify-content-between">
//                           <div
//                             class=" title-table my-auto"
//                             style={{ fontSize: "26px" }}
//                           >
//                             DOANH THU THEO KHOẢNG NGÀY
//                           </div>
//                           <div class=" mt-2 d-flex" id="input-date">
//                             <div class="mr-2 form-label my-auto">Từ ngày</div>
//                             <div class="ml-2 mr-2">
//                               <input
//                                 type="date"
//                                 min="2020-01-01"
//                                 max=""
//                                 class="form-control report-date"
//                                 id="dateStartReport"
//                               />
//                             </div>
//                             <div class="mr-2 form-label my-auto">đến ngày</div>
//                             <div class="mr-2">
//                               <input
//                                 type="date"
//                                 min="2020-01-01"
//                                 max=""
//                                 class="form-control report-date"
//                                 id="dateEndReport"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div class="card-body">
//                         <div id="chartDayToDay" style={{ width: "100%" }}></div>
//                       </div>
//                     </div>
//                   </div>

//                   <div class="col-12 col-lg-12">
//                     <div class="card">
//                       <div class="card-header">
//                         <div class="row d-flex justify-content-between">
//                           <div class="ml-3 title-table">
//                             DOANH THU TỪNG THÁNG THEO NĂM
//                           </div>
//                           <div class="col-4 mr-3 d-flex">
//                             <select
//                               type=""
//                               class="form-control mr-1"
//                               id="yearReport"
//                               name="yearReport"
//                             >
//                               <option value="2023"> Năm 2023</option>
//                               <option value="2022"> Năm 2022</option>
//                             </select>
//                           </div>
//                         </div>
//                       </div>
//                       <div class="card-body">
//                         <div
//                           id="reportByYearChart"
//                           style={{ width: "100%", maxWidth: "1000px" }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Report;
