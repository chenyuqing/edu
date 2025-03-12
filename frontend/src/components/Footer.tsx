'use client';

export default function Footer() {
  return (
    <footer className=" py-8 text-center ">
      <img src="https://cataas.com/cat/gif" alt="Cat GIF" className="mx-auto my-4" style={{maxWidth: '200px'}}/>
      <p>&copy; {new Date().getFullYear()} 学习与创造平台 All rights reserved.</p>
    </footer>
  );
}
