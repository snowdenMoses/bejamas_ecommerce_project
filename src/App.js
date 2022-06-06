import { useEffect, useState } from 'react';
import { BiSortAlt2 } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import { collection, getDocs } from 'firebase/firestore';
import { useCart } from "react-use-cart";
import './App.css';
import './responsive.css';
import MobileNav from './components/MobileNav'
import Pagination from './components/pagination.js';
import CartComponent from './components/CartComponent';
import {database} from "./Firebase/firebaseConfig";




function App() {
  let sortedPost = []
  let bestseller = []

  

  const [isSortedByPrice, setIsSortedByPrice] = useState(false)
  const [isSortedByAlpha,setIsSortedByAlpha] = useState(false)


  const {
    addItem,
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();


  const [category,setCategory] = useState([])
  const [prevGrey,setPrevGrey]= useState(false)
  const [priceRangeArray, setPriceRangeArray] = useState([])
  const [priceFilter, setPriceFilter] = useState([])
  const [checked,setChecked] = useState([]) 
  const [currentCategory,setCurrentCategory] = useState([]) 
  const [sortingValue,setSortingValue] = useState([]) 
  const [closeModal,setCloseModal] = useState(false)
  const [showCart, setShowCart] = useState(false) 
  const [products, setProducts]=useState([])
  const [productSortingList,setProductSortingList] = useState(products)
  const [currentPage,setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState (6)
  const [cartState, setCartState] = useState(false)





  const lastPostIndex = currentPage * productsPerPage
  const firstPostIndex =  lastPostIndex - productsPerPage
  let currentPost = currentCategory.length===0 ? productSortingList.slice(firstPostIndex,lastPostIndex) : currentCategory.slice(firstPostIndex,lastPostIndex)
  const paginate =(pageNumber)=>setCurrentPage(pageNumber)
  const pageNumber = Math.ceil(productSortingList.length/productsPerPage)

  

  

  console.log(showCart)
  // Putting firebase data into collection
  const productCollection = collection(database,"products")

  useEffect(()=>{
    const getData = async () => {
        const data = await getDocs(productCollection)
        setProducts(data.docs.map(doc=>({...doc.data(),id:doc.id }) ))
        setProductSortingList(data.docs.map(doc=>({...doc.data(),id:doc.id }) ))
    }
     
    getData()
    
  },[])

  const handlePrevious =()=>{
    if(currentPage>1){
      setCurrentPage(currentPage-1)
      setPrevGrey(false)
    }
  }



  const handleNext =()=>{
    if(currentPage<pageNumber){
      setCurrentPage(currentPage+1)
    }
    
  }



  const handleSortingAndReversing =()=>{
    // console.log(!isSortedByPrice)
  }
  const handleMobilFiltering =()=>{
    setCloseModal(true)
  }

  const handleCategoryChange=(e)=>{
        const catValue = e.target.value
        const CBchecked = e.target.checked
        const filteredPost =[...checked]
        const filteredArray = [...currentCategory]

        if(CBchecked) {
          
            filteredPost.push(catValue)
          }
        else if(!CBchecked){
          const index = filteredPost.indexOf(catValue)
          if(index>-1){
            filteredPost.splice(index,1)
          }
            }

          setChecked(filteredPost)
          
          setCurrentCategory(products.filter(item=>filteredPost.includes(item.category)))
          console.log(currentCategory)
  }


  const handlePriceChange=(e)=>{
        const PriceValue = e.target.value
        const isPricechecked = e.target.checked
        // const priceArray = [...priceRangeArray]
        let outcome = products
        let noItem;

        if (isPricechecked && PriceValue === "Lower than $20") {
           outcome = products.filter(item=>item.price<20)
        }

        else if (PriceValue === "$20-$100") {
          outcome = products.filter(item=>(item.price >=20 && item.price<=100))
       }


        else if (PriceValue === "$100-$200") {
          outcome = products.filter(item=>(item.price >=100 && item.price<=200))
      }
      
        else if (PriceValue === "More than $200") {
          outcome = products.filter(item=>(item.price >=200))
      }

      else{
        return (
           noItem ="No Item Found"
          )
      }
        // return outcome

        // if(isPricechecked) {
          
        //     priceArray.push(PriceValue)
        //   }
        // else if(!isPricechecked){
        //   const index = priceArray.indexOf(PriceValue)
        //     if(index>-1){
        //       priceArray.splice(index,1)
        //     }
        // }

        //   setPriceRangeArray(priceArray)
          
        //   setPriceFilter(products.filter(item=>priceArray.includes(item.price)))
          console.log(outcome)
          setPriceFilter(outcome)

  }

  

  
  const handleSorting = function (e){
        // let value = [...sortingValue]
        const value = e.target.value
        // setSortingValue(value)

        if(value==="Price"){
          sortedPost = [].concat(products)
          sortedPost.sort((a,b)=>a.price > b.price ? 1 : -1)
        
          setProductSortingList(sortedPost)
        }

        else if( value==="A-Z"){
          sortedPost = [].concat(products)
          sortedPost.sort((a,b)=>a.name > b.name ? 1 : -1)
          
          setProductSortingList(sortedPost)
        } 

        console.log(sortingValue)
  }


  const handleCloseModal =()=>{
    setCloseModal(false)
  }

  



  const getCategory=()=>{
    products.forEach(element => {
      if(!category.includes(element.category)){
        category.push(element.category)
      }
        
    });
  }

  getCategory()


  const handleOnMouseEnter=(event)=>{
    console.log(event.target.dataset.info);
  }

  const handleOnMouseLeave=(event)=>{
    console.log(event.target.dataset.info);
  }

  const handleAddToCart =(product)=>{
    addItem(product)
    setShowCart(true)
    setCartState(true)
  }

  
  if(products.length===0)
  {
    return (
    <div className='loading-spinner'></div>
    )
  }

  
  return (
    <div className='App'>
      
      <div className='container'>
        <div className='header'>
          <div className='firstHeader'>
            <div className='logo'><p>BEJAMAS_</p></div>
            <div className='cart' >
              <FaShoppingCart  className='cart' onClick={()=>{setShowCart(true);setCartState(true)}}/>
              
              <span className='itemNumbers'>{isEmpty? 0: totalUniqueItems}</span>
            </div>
          </div>
          <div className='dividerLine'></div>
          
        </div>

        <div className='section1'>
        {
         products.filter(item=>item.featured===true).slice(0,1).map((item)=>{
           return(
              <div className='featured'>
                  <div className='featuredTop'>
                    <div className='featuredTitle'>
                      <p>{item.name}</p>
                    </div>
                    <div className='featured_addToCart' onClick={()=>addItem(item)}>
                      <p>ADD TO CART</p>
                    </div>
                  </div>
                  <div >
                  <div className='featuredTitleMobile'>
                    <p>{item.name}</p>
                  </div>
                    <div className='featuredImage'>
                        <img src={item.image.src}/>
                        <div className='topImage'>
                          <p>Photo of the day</p>
                        </div>
                    </div>
                    <div className='featured_addToCartMobile'>
                      <p onClick={()=>handleAddToCart(item)}>ADD TO CART</p>
                    </div>
                    
                  </div>
                  <div className='featuredBottom'>
                      <div className='topImageDescription'>
                          <div className='aboutTopImage'>
                            <p>About {item.name}</p>
                          </div>
                          <div className='topImageCategory'>
                              <p>{item.category}</p>
                          </div>
                          <div className='topImageLongtext'>
                              <p>{item.details}</p>
                          </div>
                      </div>
                      <div className='rightHand'>
                            <div className='alsoBuy'>
                              <p>People also buy</p>
                            </div>
                            <div className='alsoBuyImages'>
                              {
                                products.filter(item=>item.bestseller===true).slice(0,3).map(item=>(
                                  <img src={item.image.src}/>
                                ))
                              }
                              
                            </div>
                            <div className='alsoBuyDetails'>
                              <p>Details</p>
                              <p>size: 1020 x 1020 pixel</p>
                              <p>size: 15mb</p>
                            </div>
                        </div>
                    </div>                          
    
               </div>
             )}
          )
        } 
              
         
           
           <div className='dividerLine'></div>


            {/* section two  */}
            <div className='section2'>
              <div className='top'>
                <p className='category_title'>
                  Photography / <p className='featCat'>Premiun photos</p>
                </p>
                <div >
                  <p className='mobileSorting' onClick={handleMobilFiltering}><MdFilterList/></p>
                  <div className='sort'>
                    <p className='sortingButton'><BiSortAlt2 onClick={handleSortingAndReversing}/></p>
                    <p>Sort by</p>
                    <select onChange={handleSorting} value={sortingValue}>
                      <option></option>
                      <option id='sortByPrice'>Price</option>
                      <option id='sortByAlpha'>A-Z</option>
                    </select>
                  </div>
                  
                </div>
              </div>
              <div className='body'>
                <div className='left'>
                  <div className='category'>
                    <div>
                      <p>Category</p>
                    </div>
                    {
                      category.map(item=>{
                        return(
                          <div id="categoryLabel">
                            <label ><input type='checkbox' value={item} name="categories[]" onChange={handleCategoryChange}/>{item}</label>
                          </div>
                        )
                      })
                    }
                    
                  </div>


                  <div className='dividerLine'></div>

                  <div className='priceRange'>
                      <div>
                        <p>Price Range</p>
                      </div>
                      <div id='priceLabel'>
                          <label><input type='checkbox' name ="<20" onChange={handlePriceChange} value="Lower than $20"/>Lower than $20</label>
                          <label><input type='checkbox' name ="20-100" onChange={handlePriceChange} value="$20-$100"/>$20-$100</label>
                          <label><input type='checkbox' name ="100-200" onChange={handlePriceChange} value="$100-$200"/>$100-$200</label>
                          <label><input type='checkbox' name =">200" onChange={handlePriceChange} value="More than $200"/>More than $200</label>
                      </div>
                  </div>
                </div>


                <div className='right'>
                  <div className='section2ImageWrapper'>

                    {currentPost.map((product,index)=>(
                        <div className='catalog'>
                          <div class='catalogImage'>
                            <img 
                            src={product.image.src} 
                            onMouseEnter={handleOnMouseEnter} 
                            onMouseLeave={handleOnMouseLeave}
                            
                            />
                             <p className='displayImageATC' onClick={()=>handleAddToCart(product)}>ADD TO CART</p>
                            {product.bestseller===true?
                           <p className='bestseller-tag'>Bestseller</p>
                           :""}
                          </div>
                          <div className='catalogCaption'>
                            <p className='catalogCategory'>{product.category}</p>
                            <p className='catalogPhotoTitle'>{product.name}</p>
                            <p className='catalogPrice'>${product.price}</p>
                          </div>
                        </div>
                    ))}
                    
                  </div>

                 
                  {/* <Pagination 
                  postsPerPage={productsPerPage}
                  totalPost = {currentCategory.length===0 ? productSortingList.length : currentCategory.length}
                  paginate={paginate}
                  className='pagination'
                  handlePrevious={handlePrevious}
                  handleNext={handleNext}
                  currentPage={currentPage}
                  
                  /> */}

                  <Pagination
                  currentPage
                  setCurrentPage
                  productsPerPage
                  totalPost={currentCategory.length===0 ? productSortingList.length : currentCategory.length}

                  />

                  {/* <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageNumber}
                  onPageChange={changePage}
                  containerClassName={"paginateContainer"}
                  previousLinkClassName={currentPage===1?"prevGrey":"previous"}
                  nextLinkClassName={currentPage===1?"prevGrey":"next"}
                  disabledClassName={"disabledPage"}
                  activeClassName={"activePaginate"}
                  /> */}
                  {showCart===true?<CartComponent cartState={cartState} setCartState={setCartState}/>:""}
                  
                </div>
                
                


              </div>
            </div>


            {closeModal?
            <div className="mobileNav">
                  <MobileNav 
                  category={category}
                  handleCategoryChange={handleCategoryChange} 
                  handleCloseModal={handleCloseModal} />
            </div>
            :
            ""
              }


        </div>
       
      </div>
      

    </div>
  );
}

export default App;
