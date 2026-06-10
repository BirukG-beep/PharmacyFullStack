import DebounceInputDisplay from "./DebounceInputDisplay.jsx";
import {  Header , InputDiv,Input,LanguageWithDate,IconWrapper ,  DateDisplay} from '../styleHome.jsx';
import SearchIcon from '@mui/icons-material/Search';
import {formatDate} from "../utils/formatDate.js";
import { getGreeting } from "../utils/getGreeting.js";
import { getGreetingIcon } from "../utils/getGreetingIcon.jsx";
const HeaderNav = ({inputValue , setInputValue , user }) =>{
    return(
           <Header>
                
                    <InputDiv>
                        <Input type='text' placeholder='search anything here'     
                        value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)} />
                        <SearchIcon style={{color:"#484c52"  }} />
                    </InputDiv>
                    {inputValue &&  <DebounceInputDisplay inputValue={inputValue} />}
                    <LanguageWithDate>
                       
                    <p style={{
  whiteSpace: "nowrap",
  fontSize: "20px",
  fontWeight: "normal",
  color: "#2c3e50",
  textAlign: "center",
  borderRadius: "8px",
}}>
  Welcome <span style={{backgroundColor:"#eee" , paddingRight:"3px" , paddingLeft:"3px" , borderRadius:"2px"}}>{user.username}</span>
</p>

                        <DateDisplay>
                            <p style={{textAlign:"right" , paddingTop:"-8px" , display:"flex" , alignItems:"center"}}>
                                <IconWrapper>{getGreetingIcon()}</IconWrapper> {getGreeting()}
                            </p>
                            <p style={{ paddingTop:"-8px"}}>{formatDate()}</p>
                        </DateDisplay>
                    </LanguageWithDate>
                </Header>
    )
}

export default HeaderNav;