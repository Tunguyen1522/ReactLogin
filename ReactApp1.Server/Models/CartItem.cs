namespace ReactApp1.Server.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public int CatId { get; set; }
        public Cat Cat { get; set; }
        public int Quantity { get; set; }
        public string UsedID { get; set; }
    }

}
