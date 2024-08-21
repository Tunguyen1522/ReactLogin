namespace ReactApp1.Server.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public int TotalAmount { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }
}
