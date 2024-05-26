import React from "react";
import imageSrc from "../photos/Carousal2.jpg"; 

const Blog = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <img src={imageSrc} alt="Description of the image" className="mr-4 w-96 h-auto" />
        <p className="text-left leading-7">
          Web Bếp Sinh Viên là một điểm đến lý tưởng cho những người trẻ tuổi đam mê ẩm thực. Tại đây, không chỉ là nơi để họ thực hiện những thử nghiệm đầy sáng tạo trong việc nấu nướng, mà còn là một cộng đồng sôi động, nơi mà họ có thể chia sẻ niềm đam mê, kiến thức và kinh nghiệm của mình.

          Bếp nấu ăn không chỉ là nơi tạo ra những món ăn ngon mắt và dễ thưởng thức, mà còn là nơi mà những mối quan hệ được xây dựng và củng cố. Cùng nhau thực hiện những công thức phức tạp hoặc thậm chí là những món ăn đơn giản, những buổi nấu nướng đã trở thành một hoạt động gắn kết gia đình và bạn bè.

          Tuy nhiên, thế giới của ẩm thực không chỉ dừng lại ở việc nấu nướng. Web Bếp Sinh Viên còn là nơi để họ khám phá những trải nghiệm ẩm thực mới mẻ, từ việc tham gia các sự kiện nấu ăn, cuộc thi đầy hứng khởi, đến việc tham gia các khóa học nấu ăn và thảo luận với những chuyên gia hàng đầu trong lĩnh vực này.
          
          Tất cả những gì mà Web Bếp Sinh Viên mang lại không chỉ là kiến thức về nấu ăn, mà còn là sự giao lưu, chia sẻ và lan tỏa đam mê. Đó chính là điều tạo nên sức hút và giá trị đặc biệt của cộng đồng này đối với những người trẻ tuổi đam mê ẩm thực.
        </p>
      </div>
    </div>
  );
};

export default Blog;
