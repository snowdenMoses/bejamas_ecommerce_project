import  "./MobileNav.css"
import { FaRegWindowClose } from "react-icons/fa";

export default function MobileNav ({category,handleCategoryChange,handleCloseModal}){
    return(
        <div>
            <div className='mob_body'>
                <div className="mob_container">
                <div className='mob_category'>
                    <div>
                        <p>Category</p>
                    </div>
                    {
                        category.map(item=>{
                        return(
                            <div id="mob_categoryLabel">
                            <label ><input type='checkbox'  value={item} name="categories[]" onChange={handleCategoryChange}/>{item}</label>
                            </div>
                        )
                        })
                    }
                
                </div>


                <div className='mob_dividerLine'></div>

                <div className='mob_priceRange'>
                    <div>
                    <p>Price Range</p>
                    </div>
                    <div id='mob_priceLabel'>
                        <label><input type='checkbox'/>Lower than $20</label>
                        <label><input type='checkbox'/>$20-$100</label>
                        <label><input type='checkbox'/>$100-$200</label>
                        <label><input type='checkbox'/>More than $200</label>
                    </div>
                </div>
                <div className="buttons">
                    <div className="clear">CLEAR</div>
                    <div className="save">SAVE</div>
                </div>
                <div className="close" onClick={handleCloseModal}><FaRegWindowClose/></div>
                </div>

               
                
            </div>
        </div>
    )
}