export default function Home() {

  const flowSteps = [
    {
      title:"相談",
      desc:"頭の中にある想いを整理する"
    },
    {
      title:"完成イメージ",
      desc:"未来の形を見えるようにする"
    },
    {
      title:"設計",
      desc:"作れる形へ落とし込む"
    },
    {
      title:"制作",
      desc:"アイデアを現実へ変える"
    },
  ];


  return (

    <main
      style={{
        margin:0,
        padding:0,
        background:"#F7F4EE",
        color:"#1D1D1F",
        fontFamily:
        '-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif',
        overflowX:"hidden",
      }}
    >


{/* ================= HEADER ================= */}

<header

style={{

position:"fixed",
top:0,
width:"100%",
zIndex:50,

display:"flex",
justifyContent:"space-between",
alignItems:"center",

padding:"20px 40px",

boxSizing:"border-box",

background:"rgba(247,244,238,.85)",

backdropFilter:"blur(15px)",

borderBottom:
"1px solid rgba(31,48,40,.08)",

}}

>


<a
href="#"
style={{
textDecoration:"none",
display:"flex",
flexDirection:"column",
}}
>


<span
style={{

fontSize:"16px",
fontWeight:600,
letterSpacing:".12em",
color:"#1F3028"

}}
>
🌱 TANE PROJECT
</span>


<span

style={{

fontSize:"9px",
letterSpacing:".25em",
color:"#7A867C"

}}

>
Ideas into Reality.
</span>


</a>



<nav

style={{

display:"flex",
gap:"30px",
fontSize:"13px",

}}

>

<a href="#story" style={navStyle}>
物語
</a>

<a href="#flow" style={navStyle}>
流れ
</a>

<a href="#works" style={navStyle}>
作品
</a>

<a href="#tane-i" style={navStyle}>
TANE:i
</a>

<a href="#future" style={navStyle}>
未来
</a>


</nav>


</header>






{/* ================= HERO ================= */}


<section

style={{

minHeight:"100vh",

display:"flex",

flexDirection:"column",

justifyContent:"center",

alignItems:"center",

textAlign:"center",

padding:"120px 24px",

}}

>


{/* 写真差し替えエリア */}

<div

style={{

width:"100%",

maxWidth:"900px",

height:"260px",

borderRadius:"30px",

background:"#E8E2D7",

display:"flex",

alignItems:"center",

justifyContent:"center",

color:"#7A867C",

fontSize:"13px",

letterSpacing:".1em",

marginBottom:"60px",

}}

>

写真エリア
<br/>
後から工房写真を配置

</div>




<p

style={{

fontSize:"13px",

letterSpacing:".35em",

color:"#7A867C",

}}

>

Ideas into Reality.

</p>




<h1

style={{

fontSize:"clamp(45px,7vw,100px)",

fontWeight:300,

lineHeight:1.2,

letterSpacing:"-.05em",

margin:"30px 0",

}}

>

アイデアの種を、

<br/>

カタチに。

</h1>



<p

style={{

fontSize:"18px",

lineHeight:2,

color:"#55645B",

}}

>

TANE PROJECTは、

<br/>

DIYを起点に、

<br/>

アイデアを現実へ変えるブランドです。

</p>


</section>








{/* ================= STORY ================= */}


<section

id="story"

style={{

background:"#FFFFFF",

padding:"130px 24px",

}}

>


<div

style={{

maxWidth:800,

margin:"auto",

}}

>


<p

style={{

fontSize:"12px",

letterSpacing:".3em",

color:"#7A867C"

}}

>

TANE PROJECT

</p>




<h2

style={{

fontSize:"clamp(35px,5vw,55px)",

fontWeight:300,

lineHeight:1.4,

marginTop:"20px"

}}

>

小さなひらめきを、

<br/>

未来のカタチへ。

</h2>




<p

style={{

marginTop:"40px",

fontSize:"17px",

lineHeight:2.2,

color:"#555"

}}

>

人は毎日の暮らしの中で、

ふとアイデアを思いつきます。

<br/><br/>

「こんな棚があったら便利なのに。」

<br/>

「もっと簡単に作れたらいいのに。」

<br/><br/>

その小さなひらめきは、

まだ形になっていない種。

<br/><br/>

考え、設計し、作る。

<br/>

その過程を通して、

新しい価値へ育てていきます。

</p>



</div>


</section>








{/* ================= STORY MESSAGE ================= */}


<section

style={{

padding:"120px 24px",

textAlign:"center",

}}

>


<h2

style={{

fontSize:"clamp(30px,4vw,45px)",

fontWeight:300,

lineHeight:1.5

}}

>

TANE PROJECTは、

<br/>

アイデアを育てる場所。

</h2>



<p

style={{

marginTop:"30px",

fontSize:"17px",

lineHeight:2,

color:"#55645B"

}}

>

一人ひとりの挑戦が、

<br/>

誰かの新しい種になる。

</p>


</section>








{/* ================= FLOW ================= */}


<section

id="flow"

style={{

padding:"120px 24px",

background:"#FFFFFF",

}}

>


<h2

style={{

textAlign:"center",

fontSize:"45px",

fontWeight:300,

}}

>

アイデアが、

<br/>

カタチになるまで。

</h2>




<div

style={{

maxWidth:1000,

margin:"60px auto 0",

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"25px"

}}

>


{flowSteps.map((item,index)=>(


<div

key={item.title}

style={{

background:"#F7F4EE",

padding:"40px 25px",

borderRadius:"24px",

}}

>


<p

style={{

fontSize:"12px",

color:"#7A867C"

}}

>

STEP 0{index+1}

</p>


<h3

style={{

fontSize:"20px",

fontWeight:500

}}

>

{item.title}

</h3>



<p

style={{

fontSize:"14px",

color:"#555"

}}

>

{item.desc}

</p>



</div>


))}


</div>


</section>
{/* ================= WORKS ================= */}


<section

id="works"

style={{

padding:"130px 24px",

background:"#F7F4EE",

}}

>


<div

style={{

maxWidth:1000,

margin:"auto"

}}

>


<p

style={{

textAlign:"center",

fontSize:"12px",

letterSpacing:".3em",

color:"#7A867C"

}}

>

作品

</p>




<h2

style={{

textAlign:"center",

fontSize:"45px",

fontWeight:300,

lineHeight:1.4,

}}

>

生まれたアイデアが、

<br/>

暮らしを変える。

</h2>




<div

style={{

marginTop:"70px",

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(280px,1fr))",

gap:"30px"

}}

>


{[

{
title:"暮らしを変える棚",
desc:"空間や生活に合わせて考えた、世界にひとつの収納。"
},

{
title:"作業を楽しむ机",
desc:"作る時間そのものを楽しむための場所。"
},

{
title:"家族で使う家具",
desc:"毎日の思い出と一緒に育つ作品。"
}

].map(item=>(


<div

key={item.title}

style={{

background:"#FFFFFF",

borderRadius:"24px",

overflow:"hidden",

}}


>


<div

style={{

height:"220px",

background:"#E5DED1",

display:"flex",

alignItems:"center",

justifyContent:"center",

color:"#7A867C",

fontSize:"13px",

}}

>

写真エリア

</div>




<div

style={{

padding:"30px"

}}

>


<h3

style={{

fontSize:"20px",

fontWeight:500

}}

>

{item.title}

</h3>



<p

style={{

fontSize:"14px",

lineHeight:1.8,

color:"#555"

}}

>

{item.desc}

</p>


</div>


</div>


))}



</div>


</div>


</section>









{/* ================= TANE:i ================= */}



<section

id="tane-i"

style={{

background:"#1F3028",

color:"#FFFFFF",

padding:"150px 24px",

textAlign:"center"

}}

>


<p

style={{

fontSize:"12px",

letterSpacing:".4em",

opacity:.7

}}

>

TANE:i

</p>




<h2

style={{

fontSize:"clamp(70px,10vw,130px)",

fontWeight:300,

letterSpacing:"-.04em",

margin:"20px 0"

}}

>

TANE:i

</h2>




<p

style={{

fontSize:"22px",

lineHeight:2,

}}

>

あなたの中にある、

<br/>

まだ見えないアイデアを、

<br/>

一緒に育てるパートナー。

</p>


{/* TANE:i FLOW */}


<div

style={{

maxWidth:900,

margin:"80px auto 0",

display:"flex",

flexWrap:"wrap",

justifyContent:"center",

alignItems:"center",

gap:"15px"

}}

>


{[

"相談",

"完成イメージ",

"設計",

"木取り",

"制作"

].map((item,index)=>(


<div

key={item}

style={{

display:"flex",

alignItems:"center",

gap:"15px"

}}

>


<div

style={{

padding:"22px 25px",

borderRadius:"18px",

border:
"1px solid rgba(255,255,255,.3)",

minWidth:"120px"

}}

>

{item}

</div>



{index < 4 &&

<span

style={{

opacity:.5,

fontSize:"20px"

}}

>

→

</span>

}


</div>


))}


</div>






<div

style={{

marginTop:"80px",

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(180px,1fr))",

gap:"15px",

maxWidth:900,

marginLeft:"auto",

marginRight:"auto"

}}

>


{[

"アイデア相談",

"完成イメージ",

"設計図",

"木取り図",

"材料リスト"

].map(item=>(


<div

key={item}

style={{

padding:"25px",

borderRadius:"16px",

background:"rgba(255,255,255,.08)",

}}

>

{item}

</div>


))}


</div>


</section>









{/* ================= FUTURE ================= */}



<section

id="future"

style={{

background:"#FFFFFF",

padding:"140px 24px",

textAlign:"center"

}}

>


<h2

style={{

fontSize:"clamp(35px,5vw,55px)",

fontWeight:300,

lineHeight:1.4

}}

>

次のアイデアの種へ。

</h2>




<p

style={{

marginTop:"35px",

fontSize:"17px",

lineHeight:2,

color:"#555"

}}

>

TANE PROJECTは、

<br/>

ものづくりを通じて、

<br/>

新しい挑戦を育てていきます。

</p>



<div

style={{

marginTop:"60px",

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(200px,1fr))",

gap:"20px",

maxWidth:800,

marginLeft:"auto",

marginRight:"auto"

}}

>


{[

"TANE:i",

"作品",

"学び",

"つながり"

].map(item=>(


<div

key={item}

style={{

padding:"35px",

background:"#F7F4EE",

borderRadius:"20px"

}}

>

{item}

</div>


))}


</div>


</section>








{/* ================= FOOTER ================= */}



<footer

style={{

padding:"70px 24px",

textAlign:"center",

background:"#F7F4EE",

color:"#7A867C"

}}

>


<div

style={{

fontSize:"16px",

fontWeight:600,

letterSpacing:".15em",

color:"#1F3028"

}}

>

🌱 TANE PROJECT

</div>



<p

style={{

fontSize:"12px",

letterSpacing:".2em"

}}

>

Ideas into Reality.

</p>



<p

style={{

fontSize:"11px",

marginTop:"30px"

}}

>

© 2026 TANE PROJECT

</p>


</footer>



</main>

  );
}





const navStyle = {

color:"#1F3028",

textDecoration:"none",

fontSize:"13px",

fontWeight:500,

};