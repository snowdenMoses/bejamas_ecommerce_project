import React from "react";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";  
import { IoIosArrowForward } from "react-icons/io";
import "./pagination.css";

import ReactPaginate from 'react-paginate'  

const Pagination =({totalPost, productsPerPage, currentPage,setCurrentPage})=>{

    const changePage = ({selected}) =>{
        setCurrentPage(selected+1)
      }
    

    // const [color, setColor] = useState(false)
    // let pageNumbers =[]
    // for(let i = 1; i<=Math.ceil(totalPost/postsPerPage);i++){
    //     pageNumbers.push(i);
    // }

    const numberOfPages = Math.ceil(totalPost/productsPerPage)


    return(
    //     <nav className="paginationContainer">
    //         <li className={currentPage===1?"prevGrey":"prev"} onClick={handlePrevious}><IoIosArrowBack/></li>
    //         {pageNumbers.map(number=>(
                
    //             <li>
    //                 <button className="paginationButton" onClick ={()=>paginate(number)} >{number}</button>
    //             </li>
                
    //         ))}
    //         <li className={currentPage===numberOfPages?"nextGrey":"next"} onClick={handleNext}><IoIosArrowForward/></li>
           
            

    //     </nav>


    <ReactPaginate
    previousLabel={"Previous"}
    nextLabel={"Next"}
    pageCount={numberOfPages}
    onPageChange={changePage}
    containerClassName={"paginateContainer"}
    previousLinkClassName={currentPage===1?"prevGrey":"previous"}
    nextLinkClassName={currentPage===1?"prevGrey":"next"}
    disabledClassName={"disabledPage"}
    activeClassName={"activePaginate"}
    />
    )
}

export default Pagination