namespace ReactApp1.Server.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int CatId { get; set; }
        public Cat Cat { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
    }

}
